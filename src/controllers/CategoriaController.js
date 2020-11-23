const db = require('../config/database');

exports.createProdutoCategoria = async (req, res) => {
    const { nome } = req.body;
    const { rows } = await db.query(
        "INSERT INTO produtoCategoria (nome, isAtivo) VALUES ($1, $2)", [nome, 1]
    )

    res.status(201).send({
        message: "Categoria adicionada com sucesso"
    })
}

exports.listAllCategories = async (req, res) => {
    const response = await db.query(
        "SELECT * FROM produtoCategoria"
    )

    res.status(201).send({
        Categorias: response.rows
    })
}

exports.listById = async (req, res) => {
    const { id } = req.params
    console.log(id);
    const response = await db.query(
        "SELECT * FROM produtoCategoria WHERE id = ($1)", [id]
    )

    res.status(200).send({
        Categoria: response.rows
    })
}