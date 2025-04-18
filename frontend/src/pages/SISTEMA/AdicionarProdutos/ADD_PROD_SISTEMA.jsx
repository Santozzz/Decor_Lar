import React from "react";
import { useState } from "react";
import Navbar_SIS from "../../../assets/components/SISTEMA/Navbar/Navbar_SIS.jsx";
import FormularioProduto from "../../../assets/components/SISTEMA/FormularioProduto/FormularioProduto.jsx";
import axios from 'axios'

function ADD_PROD_SISTEMA() {

  return (
    <div>
      <Navbar_SIS />
      <div className="espaco"></div>
      <FormularioProduto />
    </div>
  );
}

export default ADD_PROD_SISTEMA;
