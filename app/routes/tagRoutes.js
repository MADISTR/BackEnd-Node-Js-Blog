const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/tagController')

router.post('/', [authJwt.verifyToken], controller.createTag)
router.get('/', [authJwt.verifyToken], controller.getAllTag)
router.post('/addarticle', [authJwt.verifyToken], controller.addArticle)
router.put('/:id', [authJwt.verifyToken], controller.updateTag)
router.delete('/:id', [authJwt.verifyToken], controller.deleteTag)

module.exports = router
