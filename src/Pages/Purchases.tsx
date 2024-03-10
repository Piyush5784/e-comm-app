import { useEffect } from "react";
import { usefirebaseContext } from "../context/FirebaseContext";
import "../App.css"
import PurchaseItem from "../components/PurchaseItem";
import Skeleton from "../components/Skeleton";
import { useRecoilState } from "recoil";
import { dataAtom, isLoad } from "../atoms/ItemsAtom";


const Purchases = () => {
    const firebase = usefirebaseContext();
    const [data, setData] = useRecoilState<any>(dataAtom);
    const [isLoading, setIsLoading] = useRecoilState<any>(isLoad);

    const date = new Date();

    const present_date = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    interface CartItem {
        id: string;
        quantity: number;

    }

    interface DataItem {
        razoryPayId: string;
        amount: number;
        CartItems: CartItem[];

    }

    // const dataArray = data as unknown as DataItem[];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const purchasesData = await firebase.getPurchases();
                setData(purchasesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, [firebase]);


    if (data.length == 0) {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
            return <><Skeleton /></>
        }
        else {
            return <>
                <div className="container" style={{ height: "80vh" }}>
                    <div className="mt-4">
                        <h1>Not Purchased Anything</h1>
                        <p>Oops! You haven't purchased any items yet.</p>
                    </div>
                </div>
            </>;
        }
    }
    else {

        return (
            <>
                {data.map((item: DataItem, index: number) => (
                    <>

                        <div key={index} className="rounded m-2" style={{ border: "1px solid black" }}>
                            <p className="ml">Phone no:123456789</p>
                            <p className="ml">Delivery Date : {present_date}</p>
                            <p className="ml">Payment Id: {item.razoryPayId}</p>
                            <p className="ml">Total amount paid : ₹{item.amount}</p>

                            <ul className="d-flex">
                                {item.CartItems.map((cartItem: any, cartIndex: any) => (
                                    <>
                                        <div className="m-2 d-flex flex-column justify-content-center align-items-center">
                                            <p key={cartIndex}>Quantity: {cartItem.quantity}</p>
                                            <div className="d-flex flex-column">
                                                <PurchaseItem id={cartItem.id} />
                                            </div >
                                        </div>
                                    </>
                                ))}
                            </ul>

                        </div>
                    </>
                ))}
            </>
        );
    }
};

export default Purchases;
