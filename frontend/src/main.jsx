import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom"

// SISTEMA
import PRODUTOS_SISTEMA from './pages/SISTEMA/PRODUTOS_SISTEMA.jsx'
import ADD_PROD_SISTEMA from './pages/SISTEMA/ADD_PROD_SISTEMA.jsx'
import PEDIDOS_SISTEMA from './pages/SISTEMA/PEDIDOS_SISTEMA.jsx'
import PrivateRoute from './assets/components/SISTEMA/PrivateRoute.jsx' 


// CLIENTE
import Tela_Inicial_CLIENTE from './pages/CLIENTE/Tela_Inicial_CLIENTE.jsx'
import PROD_PERSONALIZADOS from './pages/CLIENTE/PROD_PERSONALIZADOS.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

   // ROTAS PROTEGIDAS DO SISTEMA
   {
    path: "Produtos",
    element: (
        <PRODUTOS_SISTEMA />
    ),
  },
  {
    path: "AdicionarProdutos",
    element: (
        <ADD_PROD_SISTEMA />
    ),
  },
  {
    path: "Pedidos",
    element: (
        <PEDIDOS_SISTEMA />
    ),
  },
  // CLIENTE
  {
    path: "Home",
    element: ( 
      <Tela_Inicial_CLIENTE />
    ),
  },
  {
    path: "Produto_Personalizado",
    element: (<PROD_PERSONALIZADOS />
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
