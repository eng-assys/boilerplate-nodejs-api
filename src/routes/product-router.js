'use strict'

const express = require('express')
const controller = require('../controllers/product-controller')
const router = express.Router()
const authService = require('../services/auth-service')

router.get('/', authService.isAdmin, controller.get)
router.get('/:slug', authService.isAdmin, controller.getBySlug)
router.get('/admin/:id', authService.isAdmin, controller.getById)
router.get('/tag/:tag', authService.isAdmin, controller.getByTags)
router.post('/', authService.isAdmin, controller.post)
router.put('/:id', authService.isAdmin, controller.put)
router.delete('/:id', authService.isAdmin, controller.delete)

module.exports = router