
import { ItemsAtom } from "../atoms/ItemsAtom";
import { useRecoilValueLoadable } from "recoil";

const PurchaseItem = (id: any) => {
    const items = useRecoilValueLoadable(ItemsAtom)

    if (items.state == "hasValue") {
        const item = items.contents.find((item: any) => item.id === id.id)

        return <div>
            <img src={item.image} height={"50"} width={"50"} alt="img" />
        </div>
    }
};

export default PurchaseItem;
