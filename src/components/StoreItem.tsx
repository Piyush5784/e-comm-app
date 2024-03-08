import { Button, Card, CardBody } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";

type StoreItemsProps = {
    id: number,
    title: string,
    price: number,
    ratings: [],
    image: string,
    category: string,
    description: string,
    quantity: number
}

//item details ={
// category,id,description,image ,price,ratings[rate,count],title
// }

const StoreItem = ({ id, title, price, image }: StoreItemsProps) => {

    const { getItemQuantity, increaseCartQuantity, openCart } = useShoppingCart()

    const navigate = useNavigate()
    const quantity = getItemQuantity(id);

    return <>
        <Card style={{ width: "fit-content" }} className="h-100">
            <div className="p-4">
                <img src={image} height={"200px"} width={"200px"} alt="" onClick={() => navigate(`/productDetails/${id}`)} />
            </div>
            <CardBody className="d-flex flex-column">
                <div style={{ height: "70px" }} className="d-flex justify-center-space-between flex-column">
                    <div>{title.slice(0, 21)}</div>
                    <div className="ml-2">₹{price}</div>
                </div>
                <Button className="mb-2 " variant="success" onClick={() => navigate(`/productDetails/${id}`)}>Details</Button>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>Add to cart</Button>
                    ) : <Button className="w-100" variant="outline-primary" onClick={() => openCart()}>Go to cart</Button>}
                </div>
            </CardBody>
        </Card>
    </>;
};

export default StoreItem;


