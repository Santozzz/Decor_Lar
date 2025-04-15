import React from 'react'
import Navbar_CLI from '../../assets/components/CLIENTE/Navbar/Navbar_CLI.jsx'
import Personalizados from '../../assets/components/CLIENTE/Personalizados/Personalizados.jsx'


const PROD_PERSONALIZADOS = () => {
  return (
    <div>
        <Navbar_CLI/>
        <div className="espaco"></div>
        <Personalizados/>
    </div>
  )
}

export default PROD_PERSONALIZADOS