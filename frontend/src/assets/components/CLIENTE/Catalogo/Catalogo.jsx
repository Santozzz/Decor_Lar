import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Catalogo.module.css';

const Catalogo = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Dados recebidos são inválidos');
        }

        const produtosFormatados = response.data.map(produto => ({
          id: produto.id || Date.now() + Math.random(),
          titulo: produto.titulo || 'Produto sem nome',
          valor: Number(produto.valor) || 0,
          categoria: produto.categoria?.toLowerCase() || 'outros',
          img1: produto.img1 || '/images/placeholder.jpg',
          img2: produto.img2 || '/images/placeholder.jpg',
          img3: produto.img3 || '/images/placeholder.jpg',
        }));

        setProdutos(produtosFormatados);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Erro desconhecido');
        setLoading(false);
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProdutos();
  }, []);

  const produtosFiltrados = filtroAtivo === 'todos' 
    ? produtos 
    : produtos.filter(produto => produto.categoria === filtroAtivo.toLowerCase());

  const toggleFiltros = () => setMostrarFiltros(!mostrarFiltros);

  const aplicarFiltro = (categoria) => {
    setFiltroAtivo(categoria);
    setMostrarFiltros(false);
  };

  const formatarPreco = (valor) => {
    return typeof valor === 'number'
      ? `R$ ${valor.toFixed(2).replace('.', ',')}`
      : 'R$ 0,00';
  };

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>Erro: {error}</div>;

  return (
    <div className={styles.catalogoContainer}>
      <div className={styles.cabecalhoCatalogo}>
        <h1>CATÁLOGO</h1>
        <div className={styles.containerFiltro}>
          <button className={styles.botaoFiltrar} onClick={toggleFiltros}>
            Filtrar
          </button>

          {mostrarFiltros && (
            <div className={styles.menuFiltro}>
              <button onClick={() => aplicarFiltro('todos')}>Todos</button>
              <button onClick={() => aplicarFiltro('decoracao')}>Decoração</button>
              <button onClick={() => aplicarFiltro('nerd')}>Nerd</button>
              <button onClick={() => aplicarFiltro('pet')}>Pets</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.gradeProdutos}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div className={styles.cardProduto} key={produto.id}>
              <div className={styles.imagemProdutoContainer}>
                <img
                  src={produto.img1}
                  alt={produto.titulo}
                  className={styles.imagemProduto}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                    e.target.alt = 'Imagem não disponível';
                  }}
                />
              </div>
              <h3 className={styles.tituloProduto}>{produto.titulo}</h3>
              <p className={styles.precoProduto}>{formatarPreco(produto.valor)}</p>
              <button
                className={styles.botaoVer}
                onClick={() => navigate(`/produto/${produto.id}`)}
              >
                VER PRODUTO
              </button>
            </div>
          ))
        ) : (
          <p className={styles.semProdutos}>Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
