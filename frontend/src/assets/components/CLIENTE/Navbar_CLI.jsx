import "./../../styles/components/CLIENTE/Navbar_CLI.css";
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
    <nav className="navbarCLI">
      <div className="space">
        {/* Container para logo e botão (mobile) */}
        <div className="logo-and-button">
          {/* Logo */}
          <div className="logo" onClick={() => navigate("/Home")}>
            <p>Decor & Lar</p>
          </div>

          {/* Botão de Produtos Personalizados (mobile) */}
          <button
            className="personalizados mobile-only"
            onClick={handleCustomProductsClick}
          >
            <p>Produto Personalizado</p>
          </button>
        </div>

        {/* Barra de Pesquisa */}
        <form className="pesquisar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn-pesquisar">
            <i>Pesquisar</i>
          </button>
        </form>

        {/* Botão de Produtos Personalizados (desktop) */}
        <button
          className="personalizados desktop-only"
          onClick={handleCustomProductsClick}
        >
          <p>Produto Personalizado</p>
        </button>
      </div>
    </nav>
  );
};

export default NavbarCLI;