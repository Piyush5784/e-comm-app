import {
  ChangeEvent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { ItemsAtom, allItems } from "../atoms/ItemsAtom";
import { contentsProp, itemsProp } from "../Pages/Store";
import FilterCart from "../components/FilterCart";

type filterContext = {
  openSideCart: () => void;
  closeSideCart: () => void;
  setFilterLowToHigh: (e: ChangeEvent<HTMLInputElement>) => void;
  setFilterHighToLow: (e: ChangeEvent<HTMLInputElement>) => void;
  setFilterATZ: (e: ChangeEvent<HTMLInputElement>) => void;
  setFilterZTA: (e: ChangeEvent<HTMLInputElement>) => void;
  setFilterMensItems: (e: ChangeEvent<HTMLInputElement>) => void;
  setFilterWomenItems: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (newRange: number) => void;
  all_Items: itemsProp;
  setItems: SetterOrUpdater<itemsProp>;
};

export const FilterCartContext = createContext({} as filterContext);

export function useFilter() {
  return useContext(FilterCartContext);
}

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const setItems = useSetRecoilState<itemsProp>(ItemsAtom);
  const all_Items = useRecoilValue<itemsProp>(allItems);

  const [openFilter, closeFilter] = useState<boolean>(false);

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

  function setFilterHighToLow(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const filteredAndSortedItems = currItems
          .filter((item: contentsProp) => item.price)
          .sort((a: contentsProp, b: contentsProp) => b.price - a.price);
        return filteredAndSortedItems;
      });
    } else {
      return setItems(all_Items);
    }
  }

  function setFilterATZ(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const sortedItemsAZ = currItems
          .filter((item: contentsProp) => item.title)
          .sort((a: contentsProp, b: contentsProp) =>
            a.title.localeCompare(b.title)
          );
        return sortedItemsAZ;
      });
    } else {
      return setItems(all_Items);
    }
  }

  function setFilterZTA(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const sortedItemsZA = currItems
          .filter((item: contentsProp) => item.title)
          .sort((a: contentsProp, b: contentsProp) =>
            b.title.localeCompare(a.title)
          );
        return sortedItemsZA;
      });
    } else {
      return setItems(all_Items);
    }
  }

  function setFilterMensItems(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const sortedItemsMens = currItems.filter(
          (item: contentsProp) => item.category === "men's clothing"
        );
        return sortedItemsMens;
      });
    } else {
      return setItems(all_Items);
    }
  }

  function setFilterWomenItems(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setItems((currItems: itemsProp) => {
        const sortedItemsMens = currItems.filter(
          (item: contentsProp) => item.category === "women's clothing"
        );
        return sortedItemsMens;
      });
    } else {
      return setItems(all_Items);
    }
  }

  const handleRangeChange = (newRange: number) => {
    const filteredItems = all_Items.filter(
      (item: contentsProp) => item.price >= 0 && item.price <= newRange
    );
    setItems(filteredItems);
  };
  const openSideCart = () => closeFilter((c) => !c);
  const closeSideCart = () => closeFilter(false);
  // function setFilterLowToHigh(e: ChangeEvent<HTMLInputElement>) {
  //   if (e.target.checked) {
  //     setItems((currItems: itemsProp) => {
  //       const filteredAndSortedItems = currItems
  //         .filter((item: contentsProp) => item.price)
  //         .sort((a: contentsProp, b: contentsProp) => a.price - b.price);
  //       return filteredAndSortedItems;
  //     });
  //   } else {
  //     return setItems(all_Items);
  //   }
  // }

  return (
    <FilterCartContext.Provider
      value={{
        setFilterLowToHigh,
        openSideCart,
        closeSideCart,
        setFilterHighToLow,
        setFilterATZ,
        setFilterZTA,
        setFilterMensItems,
        setFilterWomenItems,
        handleRangeChange,
        all_Items,
        setItems,
      }}
    >
      {children}
      <FilterCart isSideOpen={openFilter} />
    </FilterCartContext.Provider>
  );
};
