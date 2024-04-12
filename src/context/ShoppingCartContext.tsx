import { ReactNode, createContext, useContext } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRecoilState } from "recoil";
import { isOpenAtom, total } from "../atoms/ItemsAtom";
import { toast } from "react-toastify";
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItems = {
  id: number;
  quantity: number;
};
export type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItems[];
  totalAmt: number;
  emptyCart: () => void;
  setTotal: (total: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [totalAmt, setTotalAmt] = useRecoilState<number>(total);

  const setTotal = (total: number) => setTotalAmt(total);

  const [isOpen, setOpen] = useRecoilState<boolean>(isOpenAtom);

  const [cartItems, setCartItems] = useLocalStorage<CartItems[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        toast.success("Item added to cart");
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function emptyCart() {
    setCartItems([]);
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      toast.success("Item removed to cart");
      return currItems.filter((item) => item.id !== id);
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        totalAmt,
        setTotal,
        emptyCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
