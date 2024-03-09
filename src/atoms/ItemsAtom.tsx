import { atom, selector } from "recoil";
import axios from "axios";

export const ItemsAtom = atom({
    key: "ItemsAtom",
    default: selector({
        key: "ItemsSelector",
        get: async () => {
            const res = await axios.get("https://fakestoreapi.com/products")
            return res.data
        }
    })
})

export const allItems = atom({
    key: "allItems",
    default: selector({
        key: "ItemsSelector",
        get: async () => {
            const res = await axios.get("https://fakestoreapi.com/products")
            return res.data
        }
    })
})

export const total = atom({
    key: "total",
    default: 0
})


export const isOpenAtom = atom({
    key: "isOpen",
    default: false
})


export const filterCartSidebarAtom = atom({
    key: "filterCartSidebarAtom",
    default: false
})

export const isLoad = atom({
    key: "isLoadingAtom",
    default: true
})


export const users = atom({
    key: "usersAtom",
    default: { userEmail: null, userLoggedIn: false }
})

export const dataAtom = atom({
    key: 'dataAtom',
    default: []
})

export const onlineAtom = atom({
    key: 'onlineAtom',
    default: navigator.onLine
})


export const checkAtom = atom({
    key: "checkAtom",
    default: false
})


export const search = atom({
    key: "search",
    default: ""
})