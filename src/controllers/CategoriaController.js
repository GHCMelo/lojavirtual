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