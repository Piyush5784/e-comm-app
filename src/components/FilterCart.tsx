import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasTitle,
  OffcanvasBody,
  Button,
} from "react-bootstrap";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { useFilter } from "../context/FilterCartContext";

const FilterCart = () => {
  const {
    isOpen,
    setIsOpen,
    setFilterATZ,
    setFilterHighToLow,
    setFilterLowToHigh,
    setFilterZTA,
    setFilterMensItems,
    handleRangeChange,
    setFilterWomenItems,
    all_Items,
    setItems,
  } = useFilter();
  return (
    <Offcanvas show={isOpen} onHide={() => setIsOpen(false)} placement="start">
      <OffcanvasHeader>
        <OffcanvasTitle>Cart</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <OffcanvasTitle> Filter by Price </OffcanvasTitle>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="LTH"
            onChange={(e) => setFilterLowToHigh(e)}
            value=""
            id="flexCheckDefault"
          />
          low to high
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="LTH"
            onChange={(e) => setFilterHighToLow(e)}
            value=""
            id="flexCheckDefault"
          />
          high to low
        </div>
        <br />
        <OffcanvasTitle> Filter by Name </OffcanvasTitle>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ATZ"
            onChange={(e) => setFilterATZ(e)}
            value=""
            id="flexCheckDefault"
          />
          A to Z
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="ATZ"
            onChange={(e) => setFilterZTA(e)}
            value=""
            id="flexCheckDefault"
          />
          Z to A
        </div>
        <br />

        <OffcanvasTitle> Filter by Category </OffcanvasTitle>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="mens"
            onChange={(e) => setFilterMensItems(e)}
            value=""
            id="flexCheckDefault"
          />
          Mens Category
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="mens"
            onChange={(e) => setFilterWomenItems(e)}
            value=""
            id="flexCheckDefault"
          />
          Women Category
        </div>
        <br />

        <br />
        <Slider
          min={0}
          max={1000}
          defaultValue={1000}
          onChange={(newRange) => handleRangeChange(Number(newRange))}
          marks={{ 0: "0", 250: "250", 500: "500", 750: "750", 1000: "1000" }}
          step={null}
        />
      </OffcanvasBody>

      <Button
        onClick={() => {
          setIsOpen(false);
          setItems(all_Items);
        }}
        style={{ margin: "10px" }}
      >
        Clear
      </Button>
    </Offcanvas>
  );
};

export default FilterCart;
