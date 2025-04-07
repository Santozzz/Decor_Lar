import express from 'express';
import ProdutosController from './app/Controllers/ProdutosController.js';

const router = express.Router();

router.get('/produtos', ProdutosController.index);

export default router;