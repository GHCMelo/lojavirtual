const db = require('../config/database');

exports.createProduto = async(req, res) => {
    const { name, description, cost, categoriaProduto } = req.body
    const { rows } = db.query(
        "INSERT INTO product (name, description, cost, categoriaProdutoId) VALUES ($1, $2, $3, $4)", [name, description, cost, categoriaProduto]
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
        "SELECT * FROM product as A INNER JOIN produtoCategoria as B ON A.categoriaprodutoId = B.id WHERE B.ID = ($1)", [idCategoria]
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
        "SELECT * FROM product"
    )

    res.status(200).send({
        Produtos: response.rows
    })
}

exports.listById = async (req, res) => {
    const { id } = req.params
    const response = await db.query(
        "SELECT * FROM product WHERE id = ($1)", [id]
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
        "SELECT * FROM product WHERE id = ($1)", [id]
    )
    if(produto.rowCount > 0){
        await db.query("DELETE FROM product WHERE id = ($1)", [id])
        res.status(200).send({ Message: "Produto deletado com sucesso"})
    } else{
        res.status(200).send({ Message: "Produto não encontrado."})
    }
}

exports.updateById = async (req, res) => {
    const { id, name, description, cost, } = req.body;
    if( !id || !name || !!description || !cost){
        res.status(400).send({ Message: "Necessário preencher todos os campos" })
        return false
    }

    const getProduct = await db.query(
        "SELECT * FROM product WHERE id = ($1)", [id]
    )

    if(getProduct.rowCount > 0){
        await db.query(
            "UPDATE product SET name = ($1), description = ($2), cost = ($3) WHERE id = ($4)", [name, description, cost, id]
        )
        res.status(200).send({
            Message: "Produto atualizado"
        })
    } else{
        res.status(404).send({
            Message: `Produto com ${id} não encontrado no banco de dados`
        })
        return false
    }
}