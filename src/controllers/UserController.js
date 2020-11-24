const db = require('../config/database');
const { use } = require('../routes');
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {
    const { name, username, password, confirm_password, email } = req.body
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const is_active = true
    const creation_date = year + month + day
    console.log(creation_date)

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

    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            res.status(401).send({
                Message: "Houve um erro inesperado, tente novamente"
            })
            return false
        }
        db.query(
            "INSERT INTO users (name, username, password, email, creation_date, is_active) VALUES ($1, $2, $3, $4, $5, $6)",
            [name, username, hash, email, creation_date, is_active], (err, response) =>{
                if(err){
                    res.status(401).send({ Erro: err })
                }
                else{
                    console.log(response)
                }
            }
        )

        res.status(201).send({ Message: "Usuário criado com sucesso"})
    })
}