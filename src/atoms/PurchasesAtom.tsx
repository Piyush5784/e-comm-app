import { atom, selector } from "recoil";
// import axios from "axios";



export const Purchases_Atom = atom({
    key: "Purchases_Atom",
    default: selector({
        key: "Purchases_Selector",
        get: async () => {

            // const res = await axios.get("https://fakestoreapi.com/products")
            // return res.data
        }
    })
})