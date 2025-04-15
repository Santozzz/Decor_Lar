import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DetalhesProdutos.module.css'; // Import atualizado para CSS Module
import axios from 'axios';

const Produto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagemPrincipal, setImagemPrincipal] = useState('');

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produtos/${id}`);

        if (!response.data) {
          throw new Error('Produto não encontrado');
        }

        const produtoData = response.data;

        const formattedProduto = {
          id: produtoData.id,
          titulo: produtoData.titulo || produtoData.nome || 'Produto sem nome',
          descricao: produtoData.descricao || produtoData.detalhes || 'Descrição não disponível',
          preco: Number(produtoData.valor) || Number(produtoData.preco) || 0,
          imagens: [
            produtoData.img1 || '/images/placeholder.jpg',
            produtoData.img2 || '/images/placeholder.jpg',
            produtoData.img3 || '/images/placeholder.jpg'
          ].filter(img => img !== '/images/placeholder.jpg')
        };

        setProduto(formattedProduto);
        setImagemPrincipal(formattedProduto.imagens[0] || '/images/placeholder.jpg');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Erro ao buscar produto:", err);
      }
    };

    fetchProduto();
  }, [id]);

  const formatarPreco = (valor) => {
    const num = Number(valor);
    return !isNaN(num)
      ? `R$ ${num.toFixed(2).replace('.', ',')}`
      : 'R$ 0,00';
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!produto) return <div className={styles.error}>Produto não encontrado</div>;

  return (
    <div className={styles.produtoContainer}>
      <div className={styles.ttl}><h1>Detalhes do produto</h1></div>
      <div className={styles.produtoContent}>
        
        <div className={styles.produtoGaleria}>
          <div className={styles.imagemPrincipal}>
            <img
              src={imagemPrincipal}
              alt={produto.titulo}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          <div className={styles.miniaturas}>
            {produto.imagens.map((imagem, index) => (
              <img
                key={index}
                src={imagem}
                alt={`Miniatura ${index + 1}`}
                onClick={() => setImagemPrincipal(imagem)}
                className={imagem === imagemPrincipal ? `${styles.ativo}` : ''}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.produtoDetalhes}>
          <h1>{produto.titulo}</h1>

          <div className={styles.produtoDescricao}>
            <h2>DETALHES DO PRODUTO</h2>
            <p>{produto.descricao}</p>
          </div>

          <div className={styles.produtoPreco}>
            <span>{formatarPreco(produto.preco)}</span>
          </div>

          <button className={styles.botaoPedido} onClick={() => navigate('/carrinho')}>
            FAZER PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Produto;
