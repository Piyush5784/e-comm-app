import { useState } from "react";
import { usefirebaseContext } from "../context/FirebaseContext";
import "../App.css"
import { Link } from "react-router-dom";

type user = {
    userEmail: string | null
}

const Dropdown = (user: user) => {
    const firebase = usefirebaseContext();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    return <div className="dropdown"  >
        <button className="btn btn-success d-flex justify-content-center align-items-center" style={{ borderRadius: "50%", height: "2rem", width: "2rem" }} onClick={toggleDropdown}>
            {user.userEmail?.charAt(0).toUpperCase()}
        </button>
        {isOpen && (
            <div className="dropdown-menu " style={{ display: 'block' }}>
                <a className="dropdown-item " onClick={() => firebase.signout()} href="#">
                    Logout
                </a>
                <Link className="dropdown-item hoverEffect" to="/purchases">
                    Purchases
                </Link>
            </div>
        )}

    </div>;
};

export default Dropdown;
