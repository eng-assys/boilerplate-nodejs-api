'use strict'

const express = require('express')
const controller = require('../controllers/order-controller')
const router = express.Router()
const authService = require('../services/auth-service')

router.get('/', authService.isAdmin, controller.get)
router.get('/admin/:id', authService.authorize, controller.getById)
router.post('/', authService.authorize, controller.post)
router.put('/:id', authService.isAdmin, controller.put)
router.delete('/:id', authService.isAdmin, controller.delete)

module.exports = router