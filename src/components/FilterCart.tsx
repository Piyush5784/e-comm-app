import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, Button } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ItemsAtom, allItems, filterCartSidebarAtom } from "../atoms/ItemsAtom";

import 'rc-slider/assets/index.css';
import Slider from "rc-slider";

const FilterCart = () => {

    const [isOpen, setIsOpen] = useRecoilState(filterCartSidebarAtom)
    const setItems = useSetRecoilState(ItemsAtom)
    const all_Items = useRecoilValue(allItems)





    function setFilterLowToHigh(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                console.log(currItems)
                const filteredAndSortedItems = currItems.filter((item: any) => item.price).sort((a: any, b: any) => a.price - b.price);
                return filteredAndSortedItems;
            })
        }
        else {
            return setItems(all_Items)
        }
    }

    function setFilterHighToLow(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const filteredAndSortedItems = currItems.filter((item: any) => item.price).sort((a: any, b: any) => b.price - a.price);
                return filteredAndSortedItems;
            })
        }
        else {
            return setItems(all_Items)
        }
    }

    function setFilterATZ(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const sortedItemsAZ = currItems.filter((item: any) => item.title).sort((a: any, b: any) => a.title.localeCompare(b.title))
                return sortedItemsAZ;
            });
        }
        else {
            return setItems(all_Items)
        }
    }

    function setFilterZTA(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const sortedItemsZA = currItems.filter((item: any) => item.title).sort((a: any, b: any) => b.title.localeCompare(a.title));
                return sortedItemsZA;
            });
        }
        else {
            return setItems(all_Items)
        }
    }

    function setFilterMensItems(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const sortedItemsMens = currItems.filter((item: any) => item.category === "men's clothing");
                return sortedItemsMens;
            });
        }
        else {
            return setItems(all_Items)
        }
    }

    function setFilterWomenItems(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const sortedItemsMens = currItems.filter((item: any) => item.category === "women's clothing");
                return sortedItemsMens;
            });
        }
        else {
            return setItems(all_Items)
        }
    }

    // function setFilterElectornicItems(e: any) {
    //     if (e.target.checked) {
    //         setItems((currItems: any) => {
    //             const sortedItemsMens = currItems.filter((item: any) => item.category === "electronics");
    //             return sortedItemsMens;
    //         });
    //     }
    //     else {
    //         return setItems(all_Items)
    //     }
    // }


    // function setFilterJewelleryItems(e: any) {
    //     if (e.target.checked) {
    //         setItems((currItems: any) => {
    //             const sortedItemsMens = currItems.filter((item: any) => item.category === "jewelery");
    //             return sortedItemsMens;
    //         });
    //     }
    //     else {
    //         return setItems(all_Items)
    //     }
    // }

    const handleRangeChange = (newRange: any) => {
        const filteredItems = all_Items.filter((item: any) => item.price >= 0 && item.price <= newRange);
        setItems(filteredItems);
    };

    return <Offcanvas show={isOpen} onHide={() => setIsOpen(false)} placement="start">
        <OffcanvasHeader>
            <OffcanvasTitle>Cart</OffcanvasTitle>

        </OffcanvasHeader>
        <OffcanvasBody>
            <OffcanvasTitle> Filter by Price </OffcanvasTitle>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="LTH" onChange={(e) => setFilterLowToHigh(e)} value="" id="flexCheckDefault" />
                low to high
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="LTH" onChange={(e) => setFilterHighToLow(e)} value="" id="flexCheckDefault" />
                high to low
            </div>
            <br />
            <OffcanvasTitle> Filter by Name </OffcanvasTitle>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="ATZ" onChange={(e) => (setFilterATZ(e))} value="" id="flexCheckDefault" />
                A to Z
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="ATZ" onChange={(e) => (setFilterZTA(e))} value="" id="flexCheckDefault" />
                Z to A
            </div>
            <br />

            <OffcanvasTitle> Filter by Category </OffcanvasTitle>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="mens" onChange={(e) => (setFilterMensItems(e))} value="" id="flexCheckDefault" />
                Mens Category
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" name="mens" onChange={(e) => (setFilterWomenItems(e))} value="" id="flexCheckDefault" />
                Women Category
            </div>
            <br />
            {/* <OffcanvasTitle> Filter by type of products </OffcanvasTitle> */}

            {/* <div className="form-check">
                <input className="form-check-input" type="radio" name="ATZ" onChange={(e) => (setFilterJewelleryItems(e))} value="" id="flexCheckDefault" />
                Jewellery
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="ATZ" onChange={(e) => (setFilterElectornicItems(e))} value="" id="flexCheckDefault" />
                Electornic
            </div> */}

            <br />
            <Slider
                min={0}
                max={1000}
                defaultValue={1000}
                onChange={(newRange) => handleRangeChange(newRange)}
                marks={{ 0: '0', 250: '250', 500: '500', 750: '750', 1000: '1000' }}
                step={null}
            />


        </OffcanvasBody>

        <Button onClick={() => { setIsOpen(false); setItems(all_Items) }} style={{ margin: "10px" }}>Clear</Button>
    </Offcanvas>;
};

export default FilterCart;


{/* */ }