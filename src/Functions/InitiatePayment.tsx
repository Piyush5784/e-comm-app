
import { toast } from "react-toastify";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export function initiatePayment(getAmt: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        var options = {
            key: import.meta.env.VITE_React_APP_key,
            key_secret: import.meta.env.VITE_React_APP_key_secret,
            amount: getAmt * 100,
            currency: "INR",
            order_receipt: 'order_rcptid_',
            name: "test",
            description: "for testing purpose",
            handler: (response: any) => {
                if (response.razorpay_payment_id) {
                    const id = response.razorpay_payment_id;
                    resolve(id);
                } else {
                    toast.warning("Payment failed or canceled.");
                    reject(new Error("Payment failed or canceled."));
                }
            },
            theme: {
                color: "#3399cc"
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    });
}






export default initiatePayment;

