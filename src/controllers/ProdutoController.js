const { response } = require('../app');
const db = require('../config/database');

exports.createProduto = async(req, res) => {
    const { nome, descricao, valor, categoriaProduto } = req.body
    const { rows } = db.query(
        "INSERT INTO produto (nome, descricao, valor, categoriaProdutoId) VALUES ($1, $2, $3, $4)", [nome, descricao, valor, categoriaProduto]
    )

    res.status(201).send({
        msg: "Produto adicionado com sucesso",
        produto: {
            nome,
            descricao,
            valor,
            categoriaProduto
        }
    })
}

exports.listProdutoByCategoria = async(req, res) => {
    const { idCategoria } = req.params;
    const response = await db.query(
        "SELECT * FROM produto as A INNER JOIN produtoCategoria as B ON A.categoriaprodutoId = B.id WHERE B.ID = ($1)", [idCategoria]
    )

    res.status(200).send({
        Produtos: response.rows
    })
}