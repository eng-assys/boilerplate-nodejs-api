'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')
const md5 = require('md5')
const authService = require('../services/auth-service')

const jwt = require('jsonwebtoken')

exports.get = async () => {
    const res = await Customer
        .find({}, 'name email')
    return res
}

exports.getById = async (id) => {
    const res = await Customer.findById(id)
    return res
}

exports.create = async (body) => {
    const res = await (new Customer({
        name: body.name,
        email: body.email,
        password: md5(body.password + global.SALT_KEY),
        roles: ['user']
    })).save()
    return res
}

exports.update = async (id, body) => {
    const res = await Customer
        .findByIdAndUpdate(id, {
            $set: body
        })
    return res
}

exports.delete = async (id) => {
    const res = await Customer.findByIdAndRemove(id)
    return res
}

exports.authenticate = async (data) => {
    const customer = await Customer.findOne({
        email: data.email,
        password: md5(data.password + global.SALT_KEY)
    })

    if (!customer) return false

    return authService.generateToken({
        id: customer._id,
        name: customer.name,
        email: customer.email,
        roles: customer.roles
    })
}

exports.refreshToken = async (token) => {

    var data = await jwt.decode(token)

    const customer = await Customer.findById(data.id)

    if (!customer) return false

    return authService.generateToken({
        id: customer._id,
        name: customer.name,
        email: customer.email,
        roles: customer.roles
    })

}