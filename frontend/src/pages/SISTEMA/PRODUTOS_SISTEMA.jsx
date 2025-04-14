import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./../../assets/components/SISTEMA/Navbar_SIS.jsx";
import "./../../assets/styles/pages/SISTEMA/PRODUTOS_SISTEMA.css";

const Produtos = () => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/produtos/${id}`);
      alert("Produto excluído com sucesso!");
  
      // Atualiza a lista original removendo o item excluído
      setProdutos((produtosAnteriores) =>
        produtosAnteriores.filter((produto) => produto.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto.");
    }
  };

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        // Verifica se os dados são válidos antes de atualizar o estado
        if (Array.isArray(response.data)) {
          setProdutos(
            response.data.map((produto) => ({
              id: produto.id || 0,
              titulo: produto.titulo || "Produto sem nome",
              valor: Number(produto.valor) || 0, // Garante que preco seja um número
              categoria: produto.categoria || "outros",
              img1: produto.img1 || "/images/placeholder.jpg",
              img2: produto.img2 || "/images/placeholder.jpg",
              imag3: produto.img3 || "/images/placeholder.jpg",
            }))
          );
        } else {
          throw new Error("Formato de dados inválido");
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
  const produtosFiltrados =
    filtroAtivo === "todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria &&
            produto.categoria.toLowerCase() === filtroAtivo.toLowerCase()
        );

  const toggleFiltros = () => setMostrarFiltros(!mostrarFiltros);

  const aplicarFiltro = (categoria) => {
    setFiltroAtivo(categoria);
    setMostrarFiltros(false);
  };

  // Formatação segura do preço
  const formatarPreco = (valor) => {
    try {
      return typeof valor === "number" ? `R$${valor.toFixed(2)}` : "R$0,00";
    } catch {
      return "R$0,00";
    }
  };

  if (loading) return <div className="loading">Carregando produtos...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="space"></div>
      <div className="content">
        <div className="header">
          <div className="gap">
            <h1>CATÁLOGO</h1>
            <div className="btn-box">
              <button className="botao-filter" onClick={toggleFiltros}>
                Filtrar
              </button>

              {mostrarFiltros && (
                <div className="menu">
                  <button onClick={() => aplicarFiltro("todos")}>Todos</button>
                  <button onClick={() => aplicarFiltro("decoracao")}>
                    Decoração
                  </button>
                  <button onClick={() => aplicarFiltro("nerd")}>Nerd</button>
                  <button onClick={() => aplicarFiltro("pet")}>Pets</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grade">
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
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>
                <h3 className="titulo-produto">{produto.titulo}</h3>
                <p className="preco-produto">{formatarPreco(produto.valor)}</p>
                <div className="crud">
                <button className="b" onClick={() => handleDelete(produto.id)}>Excluir</button>                  
                <button className="b">Editar</button>
                </div>
              </div>
            ))
          ) : (
            <p className="sem-produtos">
              Nenhum produto encontrado nesta categoria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
