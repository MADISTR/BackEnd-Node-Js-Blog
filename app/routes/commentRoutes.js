const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/commentController')

router.post('/', [authJwt.verifyToken], controller.createComment)
router.get('/', [authJwt.verifyToken], controller.getAllComment)
router.get('/:id', [authJwt.verifyToken], controller.getCommentsByArticle)
router.put('/:id', [authJwt.verifyToken], controller.updateComment)
router.delete('/:id', [authJwt.verifyToken], controller.deleteComment)

module.exports = router
