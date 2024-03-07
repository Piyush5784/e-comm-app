import { Link } from "react-router-dom";
import backgroundImg from "../assets/background.jpg"
import "../App.css"
const Home = () => {

    return <>



        <div style={{
            backgroundImage: `url('${backgroundImg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'black',
        }}>
            <div style={{ marginBottom: "200px" }} className=" d-flex justify-center align-items-center flex-column">
                <h1>Welcome to Our Store</h1>
                <p>Explore our collection and find the perfect items for you</p>
                <Link className="btn btn-primary " to={"/store"} style={{ fontSize: '1.2rem' }}>Shop Now</Link>
            </div>
        </div>


    </>
};

export default Home;    
