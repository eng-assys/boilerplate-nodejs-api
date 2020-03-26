'use strict'

const express = require('express')
const controller = require('../controllers/customer-controller')
const router = express.Router()
const authService = require('../services/auth-service')

router.get('/', authService.isAdmin, controller.get)
router.get('/admin/:id', authService.isAdmin, controller.getById)
router.post('/', controller.post)
router.post('/login', controller.authenticate)
router.post('/refresh-token', authService.authorize, controller.refreshToken)
router.put('/:id', authService.isAdmin, controller.put)
router.delete('/:id', authService.isAdmin, controller.delete)

module.exports = router