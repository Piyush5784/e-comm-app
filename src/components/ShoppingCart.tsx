import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ItemsAtom } from "../atoms/ItemsAtom";
import { useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type ShoppingCartProp = {
    isOpen: boolean
}

const ShoppingCart = ({ isOpen }: ShoppingCartProp) => {
    const navigate = useNavigate()
    const networkConnectionCount = useRecoilValueLoadable(ItemsAtom);

    const { closeCart, cartItems, increaseCartQuantity, decreaseCartQuantity, getItemQuantity, setTotal } = useShoppingCart();

    let total = Math.floor(getTotal());

    useEffect(() => {
        setTotal(total)
    })

    function getTotal() {
        if (networkConnectionCount.state == "hasValue") {
            return (cartItems.reduce((total, cartItem) => {
                const item = networkConnectionCount.contents.find((item: any) => item.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
            }, 0))
        }
        else {
            return 0
        }
    }

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <OffcanvasHeader>
            <OffcanvasTitle>Cart</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
            <Stack gap={3}>
                {cartItems.map(item => <>

                    <CartItem key={item.id} {...item} />
                    <div>
                        <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
                        <span className="m-2">{getItemQuantity(item.id)} in cart</span>
                        <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                    </div>
                </>)}

                {total === 0 ? "Cart is Empty" : null}
                <div className="ms-auto fw-bold fs-5">
                    Total : ₹ {total}
                </div>
                <Button onClick={() => navigate(`/checkout`)}>Proceed to checkout</Button>
            </Stack>
        </OffcanvasBody>
    </Offcanvas>;
};

export default ShoppingCart;
