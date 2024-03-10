
import { Link } from "react-router-dom";
import { ItemsAtom } from "../atoms/ItemsAtom";
import { useRecoilValueLoadable } from "recoil";

const PurchaseItem = (id: any) => {
    const items = useRecoilValueLoadable<any>(ItemsAtom)

    if (items.state == "hasValue") {
        const item = items.contents.find((item: any) => item.id === id.id)

        return <Link to={`/productDetails/${item.id}`}>
            <img src={item.image} height={"50"} width={"50"} alt="img" />
        </Link>
    }
};

export default PurchaseItem;


{/* <Button className="mb-2" variant="success" onClick={() => navigate(`/productDetails/${id}`)}>Details</Button>
<div className="mt-auto"> */}