'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug)
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

exports.getByTags = async (req, res, next) => {
    try {
        const data = await repository.getByTags(req.params.tag)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres')

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        const data = await repository.create(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        })
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: error
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        const data = await repository.update(req.params.id, req.body)
        res.status(200).send('Produto atualizado com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await repository.delete(req.params.id)
        res.status(200).send('Produto removido com sucesso')
    } catch (error) {
        res.status(400).send(error)
    }
}