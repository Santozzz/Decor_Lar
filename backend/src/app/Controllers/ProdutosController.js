import {
  getAllProdutos,
  getProdutoById,
  addProduto,
  updateProduto,
  deleteProduto
} from '../Repository/ProdutoRepository.js';

export default {
  
  // Get de todos os produtos
  async index(req, res) {
    try {
      const produtos = await getAllProdutos();
      res.status(200).json(produtos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async store(req, res) {
    try {
      const novoProduto = req.body;
      const result = await addProduto(novoProduto);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const produto = req.body;
      const result = await updateProduto(id, produto);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await deleteProduto(id);
      res.status(200).json({ message: "Produto deletado com sucesso!", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const produto = await getProdutoById(id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

};
