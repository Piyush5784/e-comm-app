import { Link } from "react-router-dom";
import { ItemsAtom } from "../atoms/ItemsAtom";
import { useRecoilValueLoadable } from "recoil";
import { contentsProp, itemsProp } from "../Pages/Store";

type PurchaseItemProp = {
  id: number;
};

const PurchaseItem = (id: PurchaseItemProp) => {
  const items = useRecoilValueLoadable<itemsProp>(ItemsAtom);

  if (items.state == "hasValue") {
    const item = items.contents.find((item: contentsProp) => item.id === id.id);

    return (
      <Link to={`/productDetails/${item.id}`}>
        <img src={item.image} height={"50"} width={"50"} alt="img" />
      </Link>
    );
  }
};

export default PurchaseItem;
