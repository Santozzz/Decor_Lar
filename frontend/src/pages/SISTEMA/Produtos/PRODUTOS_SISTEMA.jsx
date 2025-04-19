import React, { useState, useEffect } from "react";
import Navbar from "./../../../assets/components/SISTEMA/Navbar/Navbar_SIS.jsx";
import Catalogo from "./../../../assets/components/SISTEMA/CatalogoSistema/CatalogoSistema.jsx"

const Produtos = () => {
  return (
    <div>
      <Navbar />
      <div className="space"></div>
      <Catalogo />
    </div>
  );
};

export default Produtos;
