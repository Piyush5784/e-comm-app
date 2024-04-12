import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}
type responseType = {
  razorpay_payment_id: string;
};
type optionsType = {
  key: any;
  key_secret: any;
  amount: number;
  currency: string;
  order_receipt: string;
  name: string;
  description: string;
  handler: (response: responseType) => void;
  theme: {
    color: string;
  };
};

export function initiatePayment(getAmt: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    var options: optionsType = {
      key: import.meta.env.VITE_React_APP_key,
      key_secret: import.meta.env.VITE_React_APP_key_secret,
      amount: getAmt * 100,
      currency: "INR",
      order_receipt: "order_rcptid_",
      name: "test",
      description: "for testing purpose",
      handler: (response: responseType) => {
        if (response.razorpay_payment_id) {
          const id: string = response.razorpay_payment_id;
          resolve(id);
        } else {
          toast.warning("Payment failed or canceled.");
          reject(new Error("Payment failed or canceled."));
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  });
}

export default initiatePayment;
