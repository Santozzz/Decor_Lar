import { NavLink } from "react-router-dom";
import './../../styles/components/SISTEMA/Navbar_SIS.css'
import React, { useState, useRef, useEffect } from "react"


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificacoesAbertas, setNotificacoesAbertas] = useState(false)
    const dropdownRef = useRef()

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const toggleNotificacoes = () => {
        setNotificacoesAbertas(!notificacoesAbertas)
      }
    
      // Fecha o dropdown se clicar fora
      useEffect(() => {
        const handleClickFora = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setNotificacoesAbertas(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickFora)
        return () => document.removeEventListener("mousedown", handleClickFora)
      }, [])

    return (
        <>
            {/* Navbar superior */}
            <div className="navbar-row">
                <div className="espaco">
                    <div className="log">
                        {/* Botão hamburguer visível a partir de 1240px */}
                        <button className="menu-toggle" onClick={toggleMenu}>
                            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>
                        <p>Decor&Lar</p>
                    </div>
                    <div className="notificacao-wrapper" ref={dropdownRef}>
                        <i className="fa-solid fa-bell" onClick={toggleNotificacoes}></i>

                        {notificacoesAbertas && (
                          <div className="notificacoes-modal">
                            
                          </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar lateral */}
            <nav className={`navbar-column ${menuOpen ? "open" : ""}`}>
                <ul className="navlist">
                    <li className="link">
                        <NavLink className="NavLink" to="/Produtos" onClick={() => setMenuOpen(false)}>
                            <div className="icon"><i className="fa-solid fa-boxes-stacked"></i></div>
                            <p>Produtos</p>
                        </NavLink>
                    </li>
                    <li className="link">
                        <NavLink className="NavLink" to="/AdicionarProdutos" onClick={() => setMenuOpen(false)}>
                            <div className="icon"><i className="fa-solid fa-cart-plus"></i></div>
                            <p>Adicionar Produtos</p>
                        </NavLink>
                    </li>
                    <li className="link">
                        <NavLink className="NavLink" to="/Pedidos" onClick={() => setMenuOpen(false)}>
                            <div className="icon"><i className="fa-solid fa-list-ol"></i></div>
                            <p>Pedidos</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
