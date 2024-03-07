
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx'
import { FirebaseProvider } from './context/FirebaseContext.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <ShoppingCartProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  </RecoilRoot>
)
