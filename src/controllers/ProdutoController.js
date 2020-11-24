const db = require('../config/database');

exports.createProduto = async(req, res) => {
    const { name, description, cost, categoriaProduto } = req.body
    const { rows } = db.query(
        "INSERT INTO produto (name, description, cost, categoriaProdutoId) VALUES ($1, $2, $3, $4)", [name, description, cost, categoriaProduto]
    )

    res.status(201).send({
        msg: "Produto adicionado com sucesso",
        produto: {
            name,
            description,
            cost,
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
        "SELECT * FROM produto WHERE id = ($1)", [id]
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
        "SELECT * FROM produto WHERE id = ($1)", [id]
    )
    if(produto.rowCount > 0){
        await db.query("DELETE FROM produto WHERE id = ($1)", [id])
        res.status(200).send({ Message: "Produto deletado com sucesso"})
    } else{
        res.status(200).send({ Message: "Produto não encontrado."})
    }
}