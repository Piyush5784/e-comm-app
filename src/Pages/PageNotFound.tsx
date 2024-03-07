// PageNotFound


import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>404 - Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <p>Check your internet connection</p>
                <Link to="/" className="btn btn-primary">Refresh</Link>
            </div>
        </div>
    );
}

export default PageNotFound;
