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
    const response = await db.query(
        "SELECT * FROM produtoCategoria WHERE id = ($1)", [id]
    )

    if(response.rowCount > 0){
        res.status(200).send({
            Categoria: response.rows
        })
    } else{
        res.status(200).send({
            Mensagem: "Não foram encontrados registros para o filtro informado."
        })
    }
}

exports.deleteById = async(req, res) => {
    const { id } = req.params

    const produtos = await db.query(
        "SELECT * FROM produto WHERE categoriaprodutoId = ($1)", [id]
    )

    if(produtos.rowCount > 0){
        await db.query(
            "DELETE FROM produto WHERE categoriaprodutoid = ($1)", [id]
        )
        await db.query(
            "DELETE FROM produtoCategoria WHERE id = ($1)", [id]
        )
        res.status(200).send({
            Mensagem: `Categoria id ${id} deletada juntamente com seus produtos!`
        })
    } else {
        await db.query(
            "DELETE FROM produtoCategoria WHERE id = ($1)", [id]
        )
        res.status(200).send({
            Mensagem: `Categoria id ${id} deletado com sucesso!`
        })
    }

}

exports.updateById = async(req, res) =>{
    const { id } = req.params
    const { isAtivo } = req.body

    const categoria = await db.query(
        "SELECT * FROM produtoCategoria WHERE ID = ($1)", [id]
    )
    if(categoria.rowCount > 0){
        await db.query(
            "UPDATE produtoCategoria SET isAtivo = ($1)", [isAtivo]
        )
        res.status(200).send({ Menssage: "Categoria atualizada com sucesso"})
    } else{
        res.status(200).send({ Message: "Não encontrado categoria com este identificador"})
    }
}