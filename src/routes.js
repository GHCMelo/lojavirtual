const express = require('express');

const router = express.Router();

const CategoriaController = require('./controllers/CategoriaController')
const ProdutoController = require('./controllers/ProdutoController')
const UserController = require('./controllers/UserController')

//Rotas categorias
router.post('/categoria', CategoriaController.createProdutoCategoria)
router.get('/categoria', CategoriaController.listAllCategories)
router.get('/categoria/:id', CategoriaController.listById)
router.delete('/categoria/:id', CategoriaController.deleteById)
router.put('/categoria/:id', CategoriaController.updateById)

//Rotas produtos
router.post('/produto', ProdutoController.createProduto)
router.get('/produto/categoria/:idCategoria', ProdutoController.listProdutoByCategoria)
router.get('/produto', ProdutoController.listAllProducts)
router.get('/produto/:id', ProdutoController.listById)
router.delete('/produto/:id', ProdutoController.deleteById)
router.put('/produto/:id', ProdutoController.updateById)

//Rotas user
router.post('/user', UserController.createUser)

module.exports = router

