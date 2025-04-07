import { getAllProdutos } from "../Repository/ProdutoRepository.js";

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
};
