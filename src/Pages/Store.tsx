import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { ItemsAtom, search } from "../atoms/ItemsAtom";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import Skeleton from "../components/Skeleton";
import filterCartIcon from "../assets/filter.svg";
import { useFilter } from "../context/FilterCartContext";
import { memo } from "react";
import Slider from "rc-slider/lib/Slider";

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
  const {
    setFilterATZ,
    setFilterHighToLow,
    setFilterLowToHigh,
    setFilterZTA,
    setFilterMensItems,
    handleRangeChange,
    setFilterWomenItems,
    // closeSideCart,
  } = useFilter();
  const items = useRecoilValueLoadable<itemsProp>(ItemsAtom);

  const { closeSideCart } = useFilter();
  const { openSideCart } = useFilter();

  const [filterItem, setFilterItem] = useRecoilState<string>(search);

  if (items.state == "loading") {
    return <Skeleton />;
  } else if (items.state == "hasValue") {
    return (
      <>
        <div className="d-flex ">
          <input
            type="text"
            onChange={(e) => {
              setFilterItem(e.target.value.toLowerCase());
            }}
            className="form-control ml-3 mb-3 p-2"
            style={{ width: "50%" }}
            placeholder="Search item"
          />
          <div className="">
            <button
              onClick={openSideCart}
              className="nav-link border-0 bg-transparent me-3 d-flex justify-content-center align-items-center p-2 d-md-none"
              style={{ position: "relative" }}
            >
              <img src={filterCartIcon} height={"23px"} alt="icon" />
            </button>
          </div>
        </div>

        <div className="d-flex gap-3">
          <div className="border  rounded max-w-100 p-2 d-sm-none d-md-block d-lg-block">
            <p>Sort by </p>
            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="radio"
                name="LTH"
                onChange={(e) => setFilterLowToHigh(e)}
                // value=""
                // id="flexCheckDefault"
              />
              Price = low to high
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="radio"
                name="LTH"
                onChange={(e) => setFilterHighToLow(e)}
                // value=""
                // id="flexCheckDefault"
              />
              Price = high to low
            </div>
            <br />
            <p>Sort by Name</p>
            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="radio"
                name="ATZ"
                onChange={(e) => setFilterATZ(e)}
                // value=""
                // id="flexCheckDefault"
              />
              A to Z
            </div>

            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="radio"
                name="ATZ"
                onChange={(e) => setFilterZTA(e)}
                // value=""
                // id="flexCheckDefault"
              />
              Z to A
            </div>
            <br />
            <p>Availablity</p>
            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="checkbox"
                name="mens"
                onChange={(e) => setFilterMensItems(e)}
                // value=""
                // id="flexCheckDefault"
              />
              Include Mens Category
            </div>
            <div className="form-check">
              <input
                className="form-check-input border-black"
                type="checkbox"
                name="mens"
                onChange={(e) => setFilterWomenItems(e)}
                // value=""
                // id="flexCheckDefault"
              />
              Include Women Category
            </div>
            <br />
            <Slider
              min={0}
              max={1000}
              defaultValue={1000}
              onChange={(newRange) => handleRangeChange(Number(newRange))}
              marks={{
                0: "0",
                250: "250",
                500: "500",
                750: "750",
                1000: "1000",
              }}
              step={null}
            />
          </div>

          <div
            className=" d-flex justify-center items-center "
            style={{ width: "80%" }}
            onClick={() => closeSideCart()}
          >
            {items.contents.length == 0 && (
              <p className="text-center font-weight-bold">
                Sorry we don't have that item based on your preference
              </p>
            )}
            <Row md={2} xs={1} lg={4} className="g-2">
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
        </div>
      </>
    );
  }
};

export default memo(Store);
