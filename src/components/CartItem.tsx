import { useRecoilValueLoadable } from "recoil";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { ItemsAtom } from "../atoms/ItemsAtom";
import { Button, Stack } from "react-bootstrap";

type CartItemProp = {
    id: number,
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProp) {
    const { removeFromCart } = useShoppingCart();

    const networkConnectionCount = useRecoilValueLoadable(ItemsAtom);

    if (networkConnectionCount.state == "loading") {
        return <div>...loading</div>
    }
    else if (networkConnectionCount.state == "hasValue") {
        const Item = networkConnectionCount.contents.find((item: any) => item.id === id)
        return <>
            <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                <img src={Item.image} style={{ width: "125px", height: "", objectFit: "cover" }}></img>
                <div className="me-auto">
                    <div>
                        {Item.name} {" "}
                        {quantity > 1 && (
                            <span className="text-muted" style={{ fontSize: ".65rem" }}>x{quantity}</span>
                        )}

                    </div>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                        ₹{Math.floor(Item.price)}
                    </div>
                </div>
                <div> ₹{Math.floor(Item.price * quantity)}</div>
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(Item.id)}>&times;</Button>


            </Stack>

        </>


    }


}