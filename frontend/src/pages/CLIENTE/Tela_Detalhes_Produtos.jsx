import React from 'react'
import DetalhesProdutos from '../../assets/components/CLIENTE/DetalhesProdutos/DetalhesProdutos.jsx'
import Navbar_CLI from '../../assets/components/CLIENTE/Navbar/Navbar_CLI.jsx'
const Tela_Detalhes_Produtos = () => {
  return (
    <div>
        <Navbar_CLI/>
        <div className='space'></div>
        <DetalhesProdutos/>
    </div>
  )
}

export default Tela_Detalhes_Produtos