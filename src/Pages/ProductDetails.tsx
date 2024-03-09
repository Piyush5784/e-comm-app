import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { allItems } from "../atoms/ItemsAtom";
import Skeleton from "../components/Skeleton";
import StarRating from "../components/StarRating";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "../App.css"
import { Button } from "react-bootstrap";

const ProductDetails = () => {
    const { id } = useParams();
    const item = useRecoilValueLoadable<any>(allItems)
    const { getItemQuantity, increaseCartQuantity, openCart } = useShoppingCart()
    const navigate = useNavigate();

    if (item.state == "loading") {
        <Skeleton />
    }
    else if (item.state == "hasValue") {
        const product = item.contents.find((item: any) => item.id == id)
        // const remainingProducts = item.contents.filter((item: any) => item.id !== product.id)
        const quantity = getItemQuantity(product.id);

        return <>
            <Button variant="success" onClick={() => navigate("/store")}><i className="fa-solid fa-arrow-left"></i></Button>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={product.image} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="300" height="300" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">{product.title}</h1>
                    <p >{product.description}</p>
                    <p className="lead">₹{product.price}</p>
                    <div className="d-flex gap-5" >
                        <StarRating numberOfStars={(product.rating.rate)} />
                        <div >{product.rating.count}+ peoples rated</div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                        {quantity === 0 ?
                            <button type="button" className="btn btn-success btn-lg px-4 me-md-2" onClick={() => increaseCartQuantity(parseInt(product.id))}>Add to cart</button> : <button type="button" className="btn btn-outline-success btn-lg px-4 me-md-2" onClick={() => openCart()}>Go to cart</button>
                        }
                        <button type="button" className="btn btn-primary btn-lg px-4" onClick={() => navigate("/checkout")}>Checkout</button>
                    </div>
                </div>
            </div>

        </>;
    }
    else {
        return <div>Product not Found</div>
    }

};

export default ProductDetails;
