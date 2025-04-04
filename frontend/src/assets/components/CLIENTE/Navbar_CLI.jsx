import './../../styles/components/CLIENTE/Navbar_CLI.css'
import React from 'react'

const NavbarCLI = () => {
  return (
    <div>
        <nav className='navbarCLI'>
            <div className="space">
                <div className='logo'>
                    <h1>DECOR LAR</h1>
                </div>
                <div className='pesquisar'>
                    <input type="text" placeholder='PESQUISAR PRODUTO' className='barra'/>
                    <button className='btn-pesquisar'>PESQUISAR</button>
                </div>
                <div className="personalizado">
                    <button>PRODUTO PERSONALIZADO</button>
                </div>
            </div>
        </nav>

    </div>
  )
}

export default NavbarCLI