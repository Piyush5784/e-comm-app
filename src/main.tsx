import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import { FirebaseProvider } from "./context/FirebaseContext.tsx";
import { FilterProvider } from "./context/FilterCartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ShoppingCartProvider>
        <FirebaseProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </FirebaseProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  </RecoilRoot>
);
