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

    if(response.rowCount > 0){
        res.status(200).send({
            Produtos: response.rows
        })
    } else{
        res.status(200).send({ Message: "Nenhum produto encontrado nesta categoria."})
    }

}

exports.listAllProducts = async(req, res) => {
    const response = await db.query(
        "SELECT * FROM produto"
    )

    res.status(200).send({
        Produtos: response.rows
    })
}

exports.listById = async (req, res) => {
    const { id } = req.params
    const response = await db.query(
        "SELECT * FROM produto WHERE idProduto = ($1)", [id]
    )

    if(response.rowCount === 0){
        res.status(200).send({
            Mensagem: "Não encontrado produto com este identificador."
        })
        return false
    }

    res.status(200).send({
        Produto: response.rows
    })
}

exports.deleteById = async (req, res) => {
    const { id } = req.params;
    const produto = await db.query(
        "SELECT * FROM produto WHERE idProduto = ($1)", [id]
    )
    if(produto.rowCount > 0){
        await db.query("DELETE FROM produto WHERE idProduto = ($1)", [id])
        res.status(200).send({ Message: "Produto deletado com sucesso"})
    } else{
        res.status(200).send({ Message: "Produto não encontrado."})
    }
}