const db = require('../models')
const Comment = db.comment
const Article = db.article
const sequelize = require('sequelize')

exports.getAllComment = async (req, res) => {
  const comment = await Comment.findAll({
    attributes: [
      [sequelize.fn('count', sequelize.col('articleId')), 'nbComments'],
    ],
    group: ['articleId'],
    include: [
      {
        model: Article,
        attributes: ['titre'],
      },
    ],
  })
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.status(200).json({ comment })
}

exports.createComment = async (req, res) => {
  const comment = req.body
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.send(await Comment.create(comment))
}

exports.getCommentsByArticle = async (req, res) => {
  const comment = await Comment.findAll({ where: { articleId: req.params.id } })
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.status(200).json({ comment })
}

exports.updateComment = async (req, res) => {
  const commentId = req.params.id
  const comment = await Comment.update(req.body, { where: { id: commentId } })
  res.status(200).json({ comment })
}

exports.deleteComment = async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } })
  res.status(200).send('delete successfuly')
}
