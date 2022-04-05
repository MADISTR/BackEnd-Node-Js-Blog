const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/articleController')

router.post('/', [authJwt.verifyToken], controller.createArticle)
router.get('/', [authJwt.verifyToken], controller.getArticles)
router.get('/:id', [authJwt.verifyToken], controller.getArticle)
router.get(
  '/articleuser/:id',
  [authJwt.verifyToken],
  controller.getArticleByUser
)
router.put('/:id', [authJwt.verifyToken], controller.updateArticle)
router.delete('/:id', [authJwt.verifyToken], controller.deleteArticle)

module.exports = router
