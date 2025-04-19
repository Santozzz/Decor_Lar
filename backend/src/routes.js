import express from 'express';
import ProdutosController from './app/Controllers/ProdutosController.js';

const router = express.Router();

router.get('/produtos', ProdutosController.index);
router.post('/produtos', ProdutosController.store);
router.put('/produtos/:id', ProdutosController.update);  
router.delete('/produtos/:id', ProdutosController.delete);
router.get('/produtos/:id', ProdutosController.show); 

export default router;