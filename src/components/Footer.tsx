import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="container ">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>Page links</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to="/" className="nav-link p-0 text-body-secondary">
                    Home
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/store" className="nav-link p-0 text-body-secondary">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/about" className="nav-link p-0 text-body-secondary">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/about" className="nav-link p-0 text-body-secondary">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5>Conncect with us</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a
                    target="_blank"
                    href="https://github.com/Piyush5784"
                    className="nav-link p-0 text-body-secondary"
                  >
                    Github
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/piyush-kumar-jha-a29619239/"
                    className="nav-link p-0 text-body-secondary"
                  >
                    Linkedin
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    target="_blank"
                    href="https://twitter.com/Piyush5784"
                    className="nav-link p-0 text-body-secondary"
                  >
                    Twitter
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="mailto:piyushjha5668@gmail.com"
                    className="nav-link p-0 text-body-secondary"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2024 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#twitter"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
