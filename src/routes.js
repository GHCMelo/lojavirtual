const express = require('express');

const router = express.Router();

const CategoriaController = require('./controllers/CategoriaController')
const ProdutoController = require('./controllers/ProdutoController')

//Rotas categorias
router.post('/categoria', CategoriaController.createProdutoCategoria)

//Rotas produtos
router.post('/produto', ProdutoController.createProduto)
router.get('/produto/categoria/:idCategoria', ProdutoController.listProdutoByCategoria)
router.get('/produto', ProdutoController.listAllProducts)

module.exports = router

