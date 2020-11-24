const db = require('../config/database');
const { use } = require('../routes');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { name, username, password, confirm_password, email } = req.body
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1)
    const day = date.getDate()
    const is_active = true
    const creation_date = `${year}${month}${day}`

    if(!name || !username || !password || !confirm_password || !email){
        res.status(401).send({ Message: "Necessário preenchimento dos campos obrigatórios" })
        return false
    }

    if(password !== confirm_password){
        res.status(401).send({ Message: "As senhas não são idênticas" })
        return false
    }

    if(password.length < 8){
        res.status(401).send({ Message: "A senha não pode ser menor que 8 caracteres" })
        return false
    }

    const getUsers = await db.query(
        "SELECT * FROM users WHERE email = ($1)", [email]
    )

    if(getUsers.rowCount > 0){
        res.status(401).send({
            Message: "E-mail já cadastrado"
        })
        return false
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            res.status(401).send({
                Message: "Houve um erro inesperado, tente novamente"
            })
            return false
        }
        const insert = db.query(
            "INSERT INTO users (name, username, password, email, creation_date, is_active) VALUES ($1, $2, $3, $4, $5, $6)",
            [name, username, hash, email, creation_date, is_active]
        )

        res.status(201).send({ 
            Message: "Usuário criado com sucesso",
        })
    })
}

exports.listUsers = async (req, res) =>{
    const users = await db.query(
        "SELECT id, name, username, email, creation_date, is_active FROM users"
    )

    if(users.rowCount > 0){
        res.status(200).send({
            Users: users.rows
        })
        return true
    }

    res.status(200).send({
        Message: "Nenhum usuário cadastrado"
    })
}