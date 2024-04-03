import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShoppingCart } from "./ShoppingCartContext";

type Config = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    databaseURL: string
}

const firebaseConfig: Readonly<Config> = {
    apiKey: import.meta.env.VITE_React_APP_apiKey,
    authDomain: import.meta.env.VITE_React_APP_authDomain,
    projectId: import.meta.env.VITE_React_APP_projectId,
    storageBucket: import.meta.env.VITE_React_APP_storageBucket,
    messagingSenderId: import.meta.env.VITE_React_APP_messagingSenderId,
    appId: import.meta.env.VITE_React_APP_appId,
    databaseURL: import.meta.env.VITE_React_APP_databaseURL,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// const database = getDatabase(firebaseApp)

const firestore = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();

export const FirebaseContext = createContext({});

type response = {
    [key: string]: any
}
// type dbContext = {
//     createUser, loginUser, createUserUsingGoogle, firebaseAuth, signout, checkLogin:()=>void, userEmail:()=>string, addUpdatePurchase,getPurchases
// }


export const usefirebaseContext = (): response => useContext(FirebaseContext);


export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const signout = () => { signOut(firebaseAuth) }

    const [userEmail, setUserEmail] = useState("");

    const { cartItems } = useShoppingCart();
    const newCart = cartItems.filter(item => {
        if (item != undefined) {
            return item
        }
    })


    const checkLogin = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
                unsubscribe();
                if (user) {
                    setUserEmail(user.email as string);
                    resolve(user.email as string);
                } else {
                    toast.warning("No user found. Please login to proceed.");
                    navigate("/login");
                    reject(new Error("No user found"));
                }
            });
        });
    };

    const getPurchases = async () => {

        const user = await checkLogin();
        const userSnapshot = await getDocs(query(collection(firestore, 'usersCollection'), where("userEmail", "==", user)));
        const userId = userSnapshot.docs[0].id;
        const querySnapshot2 = await getDocs(collection(firestore, `usersCollection/${userId}/Purchases`));
        const purchases = querySnapshot2.docs.map(doc => doc.data());
        return purchases;
    }



    const addUpdatePurchase = async (razoryPayId: string, amount: number) => {
        const querySnapshot = await getDocs(query(collection(firestore, 'usersCollection'), where("userEmail", "==", userEmail)));

        try {
            if (!querySnapshot.empty) {
                querySnapshot.docs[0].id;

                await addDoc(collection(firestore, `usersCollection/${querySnapshot.docs[0].id}/Purchases`), {
                    CartItems: newCart,
                    razoryPayId: razoryPayId,
                    amount

                });
                return "purchases successfull"

            } else {
                const addUser = await addDoc(collection(firestore, 'usersCollection'), {
                    userEmail
                });
                await addDoc(collection(firestore, `usersCollection/${addUser.id}/Purchases`), {
                    CartItems: newCart,
                    razoryPayId: razoryPayId,
                    amount
                });
                return "purchase successfull"

            }
        } catch (error) {
            console.log(error)
            return "purchase unsuccessfull"
        }
    }


    const createUser = async (email: string, password: string) => {
        try {
            const res = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            if (res.operationType == "signIn") return "registration successfull"
            else return "registration unsccessfull"
        } catch (error) {
            return "user already exists"
        }
    }

    const createUserUsingGoogle = async () => {
        try {
            const res = await signInWithPopup(firebaseAuth, provider)
            if (res.operationType == "signIn") {
                return "registration successfull"
            }
            else {
                return "resigtration unsuccessfull"
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loginUser = async (email: string, password: string): Promise<any> => {
        try {
            const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
            if (res.operationType == "signIn") return "login successfull"
            else return "login unsccessfull"
        } catch (error) {
            return "invalid password or username"
        }
    }




    return <FirebaseContext.Provider value={{ createUser, loginUser, createUserUsingGoogle, firebaseAuth, signout, checkLogin, userEmail, addUpdatePurchase, getPurchases }}>
        {children}
    </FirebaseContext.Provider>
}
