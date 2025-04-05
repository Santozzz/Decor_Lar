import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './../../styles/components/SISTEMA/Navbar_SIS.css'


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            {/* Navbar superior */}
            <div className="navbar-row">
                <div className="space">
                    <div className="logo">
                        {/* Botão hamburguer visível a partir de 1240px */}
                        <button className="menu-toggle" onClick={toggleMenu}>
                            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>
                        <p>Decor&Lar</p>
                    </div>
                    <i class="fa-solid fa-bell"></i>
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
