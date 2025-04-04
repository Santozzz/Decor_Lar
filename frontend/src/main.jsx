import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom"
import Tela_Inicial_SISTEMA from './routes/SISTEMA/Tela_Inicial_SISTEMA.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Produtos",
    element: <Tela_Inicial_SISTEMA />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
