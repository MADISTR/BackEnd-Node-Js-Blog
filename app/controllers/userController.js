const db = require('../models')
const User = db.user

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll()
  res.status(200).json({ users })
}

exports.getUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.userId } })
  res.status(200).json({ user })
}

exports.getUserById = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } })
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.status(200).json({ user })
}

exports.updateUser = async (req, res) => {
  const userId = req.params.id
  const user = await User.update(req.body, {
    where: { id: userId },
  })
  res.status(200).json({ user })
}

exports.deleteUser = async (req, res) => {
  const userId = req.params.id
  const user = await User.destroy({ where: { id: userId } })
  res.status(200).send('delete successfuly')
}
