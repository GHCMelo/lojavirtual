const express = require('express');

const router = express.Router();

const CategoriaController = require('./controllers/CategoriaController')

router.post('/categoria', CategoriaController.createProdutoCategoria)

module.exports = router

