// import { ReactNode, createContext, useContext } from "react";

// type GetPurchasesContext = {
//     getPurchases: () => any;
//     data: any,
//     getAllItems: any
// }

// const GetPurchases = createContext({} as GetPurchasesContext);

// export function usePurchases() {
//     return useContext(GetPurchases)
// }

// export function PurchasesProvider({ children }: { children: ReactNode }) {
//     // const firebase = usefirebaseContext();

//     // async function getPurchases() {
//     //     const data = await firebase.getPurchases();
//     //     return data;
//     // }
//     // async function getAllItems() {
//     //     const allItems = useRecoilValue(Purchases_Atom)
//     //     console.log(allItems)
//     //     return allItems
//     // }

//     // function filterItemsByPurchases(items: any[], purchases: any[]): any[] {
//     //     const purchasedItemIds = purchases.flatMap(purchase => purchase.map(([itemId, _]) => itemId));
//     //     return items.filter(item => purchasedItemIds.includes(item.id));
//     // }

//     // const [data, setdata] = useState(getPurchases())


//     return <GetPurchases.Provider value={{}}>
//         {children}
//     </GetPurchases.Provider>
// }

