import React, {useState} from 'react'
import './../../styles/components/CLIENTE/Catalogo.css'

// Importe as imagens ou use caminhos dinâmicos
//import imagemProduto1 from '';
//import imagemProduto2 from '';
// Importe as demais imagens...

const Catalogo = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  // Dados dos produtos
  const produtos = [
    { id: 1, titulo: "Cama King Size", preco: 102.00, categoria: "quartos" },
    { id: 2, titulo: "Sofá 3 Lugares", preco: 102.00, categoria: "sala" },
    { id: 3, titulo: "Mesa de Jantar", preco: 102.00, categoria: "jantar" },
    { id: 4, titulo: "Armário 6 Portas", preco: 102.00, categoria: "quartos" },
    { id: 5, titulo: "Poltrona Reclinável", preco: 102.00, categoria: "sala" },
    { id: 6, titulo: "Cômoda 4 Gavetas", preco: 102.00, categoria: "quartos" },
    { id: 7, titulo: "Escrivaninha", preco: 102.00, categoria: "escritorio" },
    { id: 8, titulo: "Rack para TV", preco: 102.00, categoria: "sala" }
  ];

  // Filtrar produtos
  const produtosFiltrados = filtroAtivo === 'todos' 
    ? produtos 
    : produtos.filter(produto => produto.categoria === filtroAtivo);

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  const aplicarFiltro = (categoria) => {
    setFiltroAtivo(categoria);
    setMostrarFiltros(false);
  };

  return (
    <div className="catalogo-container">
      {/* Cabeçalho do catálogo */}
      <div className="cabecalho-catalogo">
          <h1>CATÁLOGO</h1>
          <div className="container-filtro">
          <button 
            className="botao-filtrar"
            onClick={toggleFiltros}
          >
            Filtrar
          </button>
          
          {mostrarFiltros && (
            <div className="menu-filtro">
              <button onClick={() => aplicarFiltro('todos')}>Todos</button>
              <button onClick={() => aplicarFiltro('quartos')}>Quartos</button>
              <button onClick={() => aplicarFiltro('sala')}>Sala</button>
              <button onClick={() => aplicarFiltro('jantar')}>Jantar</button>
              <button onClick={() => aplicarFiltro('escritorio')}>Escritório</button>
            </div>
          )}
        </div>
      </div>
      
      {/* Grade de produtos */}
      <div className="grade-produtos">
        {produtosFiltrados.map((produto) => (
          <div className="card-produto" key={produto.id}>
            <div className="imagem-produto-container">
              <img 
                src={`/images/produtos/${produto.id}.jpg`} 
                alt={produto.titulo} 
                className="imagem-produto"
                loading="lazy"
              />
            </div>
            <h3 className="titulo-produto">{produto.titulo}</h3>
            <p className="preco-produto">R${produto.preco.toFixed(2)}</p>
            <button className="botao-ver">VER PRODUTO</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;