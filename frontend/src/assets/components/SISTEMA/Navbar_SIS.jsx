import './../../styles/components/SISTEMA/Navbar_SIS.css'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    
    const [activeLink, setActiveLink] = useState('produtos');

    return (
        <div>
            <nav className="navbar-row">
                <div className="space">
                    <div className="logo">
                        <p>Decor&Lar</p>
                    </div>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </nav>
            <nav className="navbar-column">
                <ul className='navlist'>
                    <li className={`link ${activeLink === 'produtos' ? 'active' : ''}`}onClick={() => setActiveLink('produtos')}>
                        <NavLink className="NavLink" to="/Produtos">
                        <div className="icon">
                            <i className="fa-solid fa-boxes-stacked"></i>
                        </div>
                        <p>Produtos</p>
                        </NavLink>
                    </li>

                    <li className={`link ${activeLink === 'adicionar' ? 'active' : ''}`}onClick={() => setActiveLink('adicionar')}>
                         <NavLink className="NavLink" to="/AdicionarProdutos">
                            <div className="icon">
                                <i class="fa-solid fa-cart-plus"></i>
                            </div>
                            <p>Adicionar Produtos</p>
                        </NavLink>
                    </li>

                    <li
                        className={`link ${activeLink === 'pedidos' ? 'active' : ''}`}
                        onClick={() => setActiveLink('pedidos')}
                    >
                        <NavLink className="NavLink" to="/Pedidos">
                            <div className="icon">
                                <i class="fa-solid fa-list-ol"></i>     
                            </div>
                            <p>Pedidos</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar