import './assets/styles/default/App.css'
import './assets/styles/default/Reset.css'
import Navbar_CLI from './assets/components/CLIENTE/Navbar/Navbar_CLI.jsx'
import Catalogo from './assets/components/CLIENTE/Catalogo/Catalogo.jsx'


function App() {
  return (
    <div>
        <Navbar_CLI/>
        <Catalogo/>
    </div>
  )
}

export default App
