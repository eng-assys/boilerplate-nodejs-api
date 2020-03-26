'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/order-repository')

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
    try {
        const token = req.headers['authorization'].replace('Bearer ', '')
        await repository.create(
            token,
            req.body
        )
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o Pedido',
            data: error
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        const data = await repository.update(req.params.id, req.body)
        res.status(200).send('Pedido atualizado com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await repository.delete(req.params.id)
        res.status(200).send('Pedido removido com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}