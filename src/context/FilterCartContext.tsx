import { ChangeEvent, ReactNode, createContext, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ItemsAtom, allItems } from "../atoms/ItemsAtom";
import { contentsProp, itemsProp } from "../Pages/Store";

type filterContext = {
  setFilterLowToHigh: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FilterCartContext = createContext({} as filterContext);

export function useFilter() {
  return useContext(FilterCartContext);
}

export const filterProvider = ({ children }: { children: ReactNode }) => {
  const setItems = useSetRecoilState<itemsProp>(ItemsAtom);
  const all_Items = useRecoilValue<itemsProp>(allItems);

  function setFilterLowToHigh(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const filteredAndSortedItems = currItems
          .filter((item: contentsProp) => item.price)
          .sort((a: contentsProp, b: contentsProp) => a.price - b.price);
        return filteredAndSortedItems;
      });
    } else {
      return setItems(all_Items);
    }
  }

  return (
    <FilterCartContext.Provider value={{ setFilterLowToHigh }}>
      {children}
    </FilterCartContext.Provider>
  );
};
