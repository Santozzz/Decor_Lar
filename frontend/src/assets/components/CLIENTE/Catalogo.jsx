import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../styles/components/CLIENTE/Catalogo.css';

const Catalogo = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        // Verifica se os dados são válidos antes de atualizar o estado
        if (Array.isArray(response.data)) {
          setProdutos(response.data.map(produto => ({
            id: produto.id || 0,
            titulo: produto.titulo || 'Produto sem nome',
            preco: Number(produto.preco) || 0, // Garante que preco seja um número
            categoria: produto.categoria || 'outros',
            img1: produto.img1 || '/images/placeholder.jpg',
            img2: produto.img2 || '/images/placeholder.jpg',
            imag3: produto.img3 || '/images/placeholder.jpg',
          })));
        } else {
          throw new Error('Formato de dados inválido');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProdutos();
  }, []);

  // Filtrar produtos com verificação adicional
  const produtosFiltrados = filtroAtivo === 'todos' 
    ? produtos 
    : produtos.filter(produto => 
        produto.categoria && produto.categoria.toLowerCase() === filtroAtivo.toLowerCase()
      );

  const toggleFiltros = () => setMostrarFiltros(!mostrarFiltros);
  
  const aplicarFiltro = (categoria) => {
    setFiltroAtivo(categoria);
    setMostrarFiltros(false);
  };

  // Formatação segura do preço
  const formatarPreco = (preco) => {
    try {
      return typeof preco === 'number' 
        ? `R$${preco.toFixed(2)}` 
        : 'R$0,00';
    } catch {
      return 'R$0,00';
    }
  };

  if (loading) return <div className="loading">Carregando produtos...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="catalogo-container">
      <div className="cabecalho-catalogo">
        <h1>CATÁLOGO</h1>
        <div className="container-filtro">
          <button className="botao-filtrar" onClick={toggleFiltros}>
            Filtrar
          </button>
          
          {mostrarFiltros && (
            <div className="menu-filtro">
              <button onClick={() => aplicarFiltro('todos')}>Todos</button>
              <button onClick={() => aplicarFiltro('decoracao')}>Decoração</button>
              <button onClick={() => aplicarFiltro('nerd')}>Nerd</button>
              <button onClick={() => aplicarFiltro('pet')}>Pets</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grade-produtos">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div className="card-produto" key={produto.id || Math.random()}>
              <div className="imagem-produto-container">
                <img 
                  src={produto.img1} 
                  alt={produto.titulo} 
                  className="imagem-produto"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <h3 className="titulo-produto">{produto.titulo}</h3>
              <p className="preco-produto">{formatarPreco(produto.preco)}</p>
              <button className="botao-ver">VER PRODUTO</button>
            </div>
          ))
        ) : (
          <p className="sem-produtos">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;