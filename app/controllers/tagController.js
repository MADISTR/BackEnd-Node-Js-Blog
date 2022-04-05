const db = require('../models')
const Tag = db.tag
const Article = db.article

exports.createTag = async (req, res) => {
  const tag = req.body
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.send(
    await Tag.create(tag)
      .then((tag) => {
        console.log('>> Created Tag: ' + JSON.stringify(tag, null, 2))
        return tag
      })
      .catch((err) => {
        console.log('>> Error while creating Tag: ', err)
      })
  )
}

exports.getAllTag = async (req, res) => {
  await Tag.findAll({
    include: [
      {
        model: Article,
        as: 'articles',
        attributes: ['id', 'titre', 'contenu'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tags) => {
      return (
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, Accept'
        ),
        res.status(200).json({ tags })
      )
    })
    .catch((err) => {
      console.log('>> Error while retrieving Tags: ', err)
    })
}

exports.getTagById = async (req, res) => {
  const id = req.params.id
  await Tag.findByPk(id, {
    include: [
      {
        model: Article,
        as: 'articles',
        attributes: ['id', 'titre', 'contenu'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tag) => {
      return res.status(200).json({ tag })
    })
    .catch((err) => {
      console.log('>> Error while finding Tag: ', err)
    })
}

exports.addArticle = async (req, res) => {
  const tagId = req.body.tagId
  const articleId = req.body.articleId
  await Tag.findOne({ where: { id: tagId } })
    .then((tag) => {
      if (!tag) {
        console.log('Tag not found!')
        return null
      }
      return Article.findByPk(articleId).then((article) => {
        if (!article) {
          console.log('Article not found!')
          return null
        }
        tag.addArticle(article)
        console.log(`>> added Article id=${article.id} to Tag id=${tag.id}`)
        return res.status(200).json({ tag })
      })
    })
    .catch((err) => {
      console.log('>> Error while adding Article to Tag: ', err)
    })
}

exports.updateTag = async (req, res) => {
  const tagId = req.params.id
  const tag = await Tag.update(req.body, { where: { id: tagId } })
  res.status(200).json({ tag })
}

exports.deleteTag = async (req, res) => {
  await Tag.destroy({ where: { id: req.params.id } })
  res.status(200).send('delete successfuly')
}
