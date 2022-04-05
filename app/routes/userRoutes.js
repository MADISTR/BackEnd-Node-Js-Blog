const express = require('express')
const router = express.Router()

const { authJwt } = require('../middleware')
const controller = require('../controllers/userController')

router.get('/', [authJwt.verifyToken], controller.getAllUsers)
router.get('/user', [authJwt.verifyToken], controller.getUser)
router.get('/:id', [authJwt.verifyToken], controller.getUserById)
router.put('/:id', [authJwt.verifyToken], controller.updateUser)
router.delete('/:id', [authJwt.verifyToken], controller.deleteUser)

module.exports = router
