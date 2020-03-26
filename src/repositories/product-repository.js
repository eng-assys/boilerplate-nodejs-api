'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = async () => {
    const res = await Product
        .find({
            active: true
        }, 'title price slug')
    return res
}

exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            active: true,
            slug: slug,
        }, 'title description price slug tags')
    return res
}

exports.getById = async (id) => {
    const res = await Product.findById(id)
    return res
}

exports.getByTags = async (tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
    return res
}

exports.create = async (body) => {
    const res = await (new Product(body)).save()
    return res
}

exports.update = async (id, body) => {
    const res = await Product
        .findByIdAndUpdate(id, {
            $set: body
        })
    return res
}

exports.delete = async (id) => {
    const res = await Product.findByIdAndRemove(id)
    return res
}