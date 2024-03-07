

import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar as Navbs } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cartIcon.svg';
import filterCartIcon from '../assets/filter.svg';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useSetRecoilState } from 'recoil';
import { filterCartSidebarAtom } from '../atoms/ItemsAtom';
import { usefirebaseContext } from '../context/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const firebase = usefirebaseContext();

    interface User {
        userEmail: string | null;
        userLoggedIn: boolean;
    }

    const [user, setUser] = useState<User>({ userEmail: null, userLoggedIn: false });

    useEffect(() => {
        onAuthStateChanged(firebase.firebaseAuth, (user) => {
            if (user) {
                setUser({ userEmail: user.email, userLoggedIn: true });
                navigate('/store');
            } else {
                setUser({ userEmail: null, userLoggedIn: false });
                navigate('/login');
            }
        });
    }, []);

    const { openCart, cartQuantity } = useShoppingCart();
    const setFilter = useSetRecoilState(filterCartSidebarAtom);

    const links = [
        { to: '/', name: 'Home' },
        { to: '/about', name: 'About' },
        { to: '/store', name: 'Store' },
        { to: '/purchases', name: 'Purchases' },
    ];



    return (
        <Navbs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Navbs.Toggle aria-controls="basic-navbar-nav" />
                <Navbs.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {links.map((link) => (
                            <Nav.Link key={link.to} as={NavLink} to={link.to} className="hoverEffect">
                                {link.name}
                            </Nav.Link>
                        ))}
                    </Nav>



                    <div className="d-flex align-items-center">
                        <button
                            onClick={() => setFilter(true)}
                            className="nav-link border-0 bg-transparent me-3"
                            style={{ position: 'relative' }}
                        >
                            <img src={filterCartIcon} height={'23px'} alt="icon" />
                        </button>
                        <button
                            onClick={openCart}
                            className="nav-link border-0 bg-transparent m-2"
                            style={{ position: 'relative' }}
                        >
                            <img src={cartIcon} height={'32px'} alt="icon" />
                            {cartQuantity === 0 ? null : cartQuantity}
                        </button>
                        {user.userLoggedIn ? (
                            <div
                                className="bg-success rounded-circle d-flex justify-content-center align-items-center me-3"
                                style={{ color: 'white', height: '30px', width: '30px' }}
                            >
                                {user.userEmail?.charAt(0).toUpperCase()}
                            </div>
                        ) : null}
                        {user.userLoggedIn ? (
                            <Button variant="danger" onClick={() => firebase.signout()}>
                                Logout
                            </Button>
                        ) : (
                            <Button onClick={() => navigate('/login')}>Login</Button>
                        )}
                    </div>
                </Navbs.Collapse>
            </Container>
        </Navbs>
    );
};

export default Navbar;
