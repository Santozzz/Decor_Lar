import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Corrigindo o import
import './../../styles/components/CLIENTE/DetalhesProdutos.css'; // Arquivo de estilos (criaremos abaixo)
import axios from 'axios';

const Produto = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Agora deve funcionar
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
          
          // Ensure the data structure matches what we expect
          const formattedProduto = {
            id: produtoData.id,
            titulo: produtoData.titulo || produtoData.nome || 'Produto sem nome',
            descricao: produtoData.descricao || produtoData.detalhes || 'Descrição não disponível',
            preco: Number(produtoData.valor) || Number(produtoData.preco) || 0,
            imagens: [
              produtoData.img1 || '/images/placeholder.jpg',
              produtoData.img2 || '/images/placeholder.jpg',
              produtoData.img3 || '/images/placeholder.jpg'
            ].filter(img => img !== '/images/placeholder.jpg') // Remove placeholders if real images exist
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
  
    // Safe price formatting
    const formatarPreco = (valor) => {
      // First ensure the value is a number
      const num = Number(valor);
      return !isNaN(num) 
        ? `R$ ${num.toFixed(2).replace('.', ',')}` 
        : 'R$ 0,00';
    };
  
    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!produto) return <div className="error">Produto não encontrado</div>;
  
    return (
      <div className="produto-container">
        <div className='ttl'><h1>Detalhes do produtos</h1></div>  
        <div className="produto-content">
          {/* Galeria de imagens */}
          <div className="produto-galeria">
            <div className="imagem-principal">
              <img 
                src={imagemPrincipal} 
                alt={produto.titulo} 
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="miniaturas">
              {produto.imagens.map((imagem, index) => (
                <img 
                  key={index} 
                  src={imagem} 
                  alt={`Miniatura ${index + 1}`} 
                  onClick={() => setImagemPrincipal(imagem)}
                  className={imagem === imagemPrincipal ? 'ativo' : ''}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              ))}
            </div>
          </div>
  
          {/* Detalhes do produto */}
          <div className="produto-detalhes">
            <h1>{produto.titulo}</h1>
            
            <div className="produto-descricao">
              <h2>DETALHES DO PRODUTO</h2>
              <p>{produto.descricao}</p>
            </div>
  
            <div className="produto-preco">
              <span>{formatarPreco(produto.preco)}</span>
            </div>
  
            <button className="botao-pedido" onClick={() => navigate('/carrinho')}>
              FAZER PEDIDO
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Produto;