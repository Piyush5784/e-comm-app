import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Store from "./Pages/Store";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./Pages/Checkout";
import PageNotFound from "./Pages/PageNotFound";
import OfflineRedirect from "./components/OfflineRedirect";
import Purchases from "./Pages/Purchases";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
const App = () => {

  const pageRoutes = [{
    path: "/",
    component: <Home />
  }, {
    path: "/about",
    component: <About />
  }, {
    path: "/store",
    component: <Store />
  }, {
    path: "/login",
    component: <Login />
  }, {
    path: "/register",
    component: <Register />
  }, {
    path: "/checkout",
    component: <Checkout />
  }, {
    path: "/PageNotFound",
    component: <PageNotFound />
  }, {
    path: "/purchases",
    component: <Purchases />
  }, {
    path: "/paymentSuccess",
    component: <PaymentSuccess />
  }, {
    path: "/productDetails/:id",
    component: <ProductDetails />
  },
  ]



  return <>
    <OfflineRedirect>
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      <Container className="mb-4">
        <Routes>
          {pageRoutes.map(route => <Route path={route.path} element={route.component} />)}
        </Routes>
      </Container>
      <Footer />
    </OfflineRedirect>
  </>
};

export default App;
