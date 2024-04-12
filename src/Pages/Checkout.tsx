import { useEffect } from "react";
import { usefirebaseContext } from "../context/FirebaseContext";
import { Button } from "react-bootstrap";
import {
  ShoppingCartContext,
  useShoppingCart,
} from "../context/ShoppingCartContext";
import { toast } from "react-toastify";
import initiatePayment from "../Functions/InitiatePayment";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { checkAtom } from "../atoms/ItemsAtom";

const Checkout = () => {
  const navigate = useNavigate();
  const firebase = usefirebaseContext();
  const ShoppingCart = useShoppingCart();
  const [checkbox, setCheckbox] = useRecoilState<boolean>(checkAtom);

  const cart: ShoppingCartContext = useShoppingCart();

  const getAmt: number = cart.totalAmt;

  const discount: number = Math.floor((10 / 100) * cart.totalAmt);

  useEffect(() => {
    firebase.checkLogin();
  });

  const purchaseHandler = async () => {
    if (getAmt == 0) {
      toast.warning("No items selected");
    } else if (!checkbox) {
      toast.warning("Select address to continue");
    } else {
      const amount: number = getAmt - discount;
      const id = await initiatePayment(amount);
      toast.success("Payment successfull");
      navigate("/paymentSuccess");
      await firebase.addUpdatePurchase(id, amount);
      ShoppingCart.emptyCart();
    }
  };

  return (
    <>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Secure Razoypay integration</h2>
          <p className="lead"></p>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Total :</h6>
                </div>
                <span className="text-muted">₹{getAmt}</span>
              </li>

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>ENHYUIDJEOE</small>
                </div>
                <span className="text-success">-{discount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (rupee)</span>
                <strong>₹{getAmt - discount}</strong>
              </li>

              <Button className="w-100% m-3" onClick={() => purchaseHandler()}>
                Proceed to payment
              </Button>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <div className="address border rounded">
              <input
                id="address"
                type="radio"
                className="m-2 p-2 custom-control-input"
                onChange={(e) => setCheckbox(e.target.checked)}
                required
              />
              <label className="custom-control-label p-2" htmlFor="credit">
                {" "}
                Address 1
              </label>
              <div className="addressDetails p-2 ml-5">
                <p>Guwahati, Assam</p>
                <p>781001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
