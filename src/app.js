'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

// Conecta ao banco de dados
mongoose.connect(config.connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
    authSource: 'admin'
}).then(
    () => {
        console.log('Mongo Correctly connected')
    },
    err => {
        console.log('Database not connected\n', err)
    }
);

// Carrega o Body Parser
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))

// Cross-origin resource sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// Carrega os Models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

// Carrega as rotas
const indexRoutes = require('./routes/index-router')
const productRoutes = require('./routes/product-router')
const customerRoutes = require('./routes/customer-router')
const orderRoutes = require('./routes/order-router')

// Adiciona as rotas
app.use('/', indexRoutes)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)

module.exports = app