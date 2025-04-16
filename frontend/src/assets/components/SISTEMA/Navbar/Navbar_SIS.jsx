// src/components/Navbar/Navbar.jsx
import { NavLink } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import styles from './Navbar_SIS.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const dropdownRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleNotificacoes = () => {
    setNotificacoesAbertas(!notificacoesAbertas);
  };

  useEffect(() => {
    const handleClickFora = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificacoesAbertas(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <>
      {/* Navbar superior */}
      <div className={styles.navbarRow}>
        <div className={styles.espaco}>
          <div className={styles.log}>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
            <p>Decor&Lar</p>
          </div>
          <div className={styles.notificacaoWrapper} ref={dropdownRef}>
            <i className="fa-solid fa-bell" onClick={toggleNotificacoes}></i>

            {notificacoesAbertas && (
              <div className={styles.notificacoesModal}>
                {/* Aqui você pode colocar suas notificações */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar lateral */}
      <nav className={`${styles.navbarColumn} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navlist}>
          <li className={styles.link}>
            <NavLink className={styles.navLink} to="/Produtos" onClick={() => setMenuOpen(false)}>
              <div className={styles.icon}><i className="fa-solid fa-boxes-stacked"></i></div>
              <p>Produtos</p>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink className={styles.navLink} to="/AdicionarProdutos" onClick={() => setMenuOpen(false)}>
              <div className={styles.icon}><i className="fa-solid fa-cart-plus"></i></div>
              <p>Adicionar Produtos</p>
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink className={styles.navLink} to="/Pedidos" onClick={() => setMenuOpen(false)}>
              <div className={styles.icon}><i className="fa-solid fa-list-ol"></i></div>
              <p>Pedidos</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
