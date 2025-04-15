import styles from "./Navbar_CLI.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarCLI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Pesquisar por:", searchTerm);
  };

  const handleCustomProductsClick = () => {
    navigate("/ProdutoPersonalizado");
  };

  return (
    <nav className={styles.navbarCli}>
      <div className={styles.space}>
        <div className={styles.logoAndButton}>
          <div className={styles.logo} onClick={() => navigate("/")}>
            <p>Decor & Lar</p>
          </div>

          <button
            className={`${styles.personalizados} ${styles.mobileOnly}`}
            onClick={handleCustomProductsClick}
          >
            <p>Produto Personalizado</p>
          </button>
        </div>

        <form className={styles.pesquisar} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.btnPesquisar}>
            <i>Pesquisar</i>
          </button>
        </form>

        <button
          className={`${styles.personalizados} ${styles.desktopOnly}`}
          onClick={handleCustomProductsClick}
        >
          <p>Produto Personalizado</p>
        </button>
      </div>
    </nav>
  );
};

export default NavbarCLI;
