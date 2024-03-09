import { ReactNode, createContext, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ItemsAtom, allItems } from "../atoms/ItemsAtom";

type filterContext = {
    setFilterLowToHigh: any;
}

const FilterCartContext = createContext({} as filterContext);


export function useFilter() {
    return useContext(FilterCartContext)
}

export const filterProvider = ({ children }: { children: ReactNode }) => {
    const setItems = useSetRecoilState<any>(ItemsAtom)
    const all_Items = useRecoilValue<any>(allItems)


    function setFilterLowToHigh(e: any) {
        if (e.target.checked) {
            setItems((currItems: any) => {
                const filteredAndSortedItems = currItems.filter((item: any) => item.price).sort((a: any, b: any) => a.price - b.price);
                return filteredAndSortedItems;
            })
        }
        else {
            return setItems(all_Items)
        }

    }

    return <FilterCartContext.Provider value={{ setFilterLowToHigh }}>
        {children}
    </FilterCartContext.Provider>
}

