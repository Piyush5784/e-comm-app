import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { ItemsAtom, search } from "../atoms/ItemsAtom";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import Skeleton from "../components/Skeleton";
import FilterCart from "../components/FilterCart";

export type contentsProp = {
  [x: string]: any;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
export type itemsProp = {
  [x: string]: any;
  state: string;
  contents: [contentsProp];
};
const Store = () => {
  const items = useRecoilValueLoadable<itemsProp>(ItemsAtom);

  const [filterItem, setFilterItem] = useRecoilState<string>(search);

  if (items.state == "loading") {
    return <Skeleton />;
  } else if (items.state == "hasValue") {
    return (
      <>
        <input
          type="text"
          onChange={(e) => {
            setFilterItem(e.target.value.toLowerCase());
          }}
          className="form-control ml-3 mb-3 p-2"
          style={{ width: "50%" }}
          placeholder="Search item"
        />

        <FilterCart />
        <div className=" d-flex justify-center items-center w-full">
          <Row md={2} xs={1} lg={4} className="g-3">
            {items.contents
              .filter((item: contentsProp) => {
                return filterItem.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(filterItem);
              })
              .map((item: contentsProp) => (
                <Col key={item.id}>
                  <StoreItem
                    ratings={item.rating}
                    quantity={item.quantity}
                    {...item}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </>
    );
  }
};

export default Store;
