'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'O campo não é uma e-mail')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        const data = await repository.create(req.body)
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o Cliente',
            data: error
        })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const access_token = await repository.authenticate(req.body)
        if (access_token) {
            res.status(200).send({
                access_token: access_token
            })
        } else {
            res.status(401).send({
                message: 'Usuário ou senha errado',
                data: error
            })
        }

    } catch (error) {
        res.status(401).send({
            message: 'Erro ao autenticar o Cliente',
            data: error
        })
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '')
        
        const access_token = await repository.refreshToken(token)

        if (access_token) {
            res.status(200).send({
                access_token: access_token
            })
        } else {
            res.status(401).send({
                message: 'Usuário inválido',
                data: error
            })
        }

    } catch (error) {
        res.status(401).send({
            message: 'Erro ao atualizar token do Cliente',
            data: error
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        const data = await repository.update(req.params.id, req.body)
        res.status(200).send('Cliente atualizado com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await repository.delete(req.params.id)
        res.status(200).send('Cliente removido com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}