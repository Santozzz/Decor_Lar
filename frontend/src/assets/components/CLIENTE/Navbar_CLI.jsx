import "./../../styles/components/CLIENTE/Navbar_CLI.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarCLI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica para lidar com a pesquisa
    console.log("Pesquisar por:", searchTerm);
    // Aqui você pode adicionar a lógica de filtragem ou redirecionamento
  };

  const handleCustomProductsClick = () => {
    navigate("/Produto_Personalizado"); // Redireciona para a página de produtos personalizados
  };

  return (
    <nav className="navbarCLI">
      <div className="space">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <p>Decor & Lar</p>
          {/* Substitua "/logo.png" pelo caminho real do seu logo */}
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
            {/* Você pode substituir por um ícone de sua biblioteca de ícones */}
          </button>
        </form>

        {/* Botão de Produtos Personalizados */}
        <button
          className="personalizados"
          onClick={handleCustomProductsClick}
        >
          <p>Produto Personalizado</p>
        </button>
      </div>
    </nav>
  );
};

export default NavbarCLI;
