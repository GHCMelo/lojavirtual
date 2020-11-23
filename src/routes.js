const express = require('express');

const router = express.Router();

const CategoriaController = require('./controllers/CategoriaController')
const ProdutoController = require('./controllers/ProdutoController')

router.post('/categoria', CategoriaController.createProdutoCategoria)
router.post('/produto', ProdutoController.createProduto)
router.get('/produto/:idCategoria', ProdutoController.listProdutoByCategoria)

module.exports = router

