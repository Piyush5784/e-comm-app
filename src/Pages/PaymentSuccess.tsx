import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import successLogo from "../assets/correct.svg"

const PaymentSuccess = () => {
    return <>
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <img src={successLogo} height={100} alt="" />
                <h1 className="mt-5">Payment successfull</h1>
                <p className="lead">Your purchased item will be shown in the purchase page</p>
                <p className="lead">Thank you for your purchase!</p>
                <Link to={"/store"} className="mt-3 btn btn-primary">Purchase More</Link>
            </div>
        </Container>
    </>;
};

export default PaymentSuccess;
