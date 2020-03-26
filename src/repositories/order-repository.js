'use strict'

const mongoose = require('mongoose')
const Order = mongoose.model('Order')
const guid = require('guid')
const jwt = require('jsonwebtoken')

exports.get = async () => {
    const res = await Order.find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title')
    return res
}

exports.getById = async (id) => {
    const res = await Order.findById(id)
    return res
}

exports.create = async (token, body) => {
    var data = await jwt.decode(token)
    const res = await (new Order({
            customer: data.id,
            number: guid.raw().substring(0, 5),
            items: body.items
        })).save()
    return res
}

exports.update = async (id, body) => {
    const res = await Order
        .findByIdAndUpdate(id, {
            $set: body
        })
    return res
}

exports.delete = async (id) => {
    const res = await Order.findByIdAndRemove(id)
    return res
}