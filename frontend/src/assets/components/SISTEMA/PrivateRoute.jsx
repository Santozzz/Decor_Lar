// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom"

const isAuthenticated = () => {
  // Aqui você verifica se o usuário está logado
  // Exemplo: verificar se existe um token no localStorage
  return localStorage.getItem("authToken") !== null
}

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />
}
