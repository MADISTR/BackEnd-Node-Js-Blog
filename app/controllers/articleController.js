const db = require('../models')
const Article = db.article
const Tag = db.tag

const Op = db.Sequelize.Op

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      titre: req.body.titre,
      contenu: req.body.contenu,
      userId: req.body.userId,
    })
    if (req.body.tags) {
      const tags = await Tag.findAll({
        where: {
          name: {
            [Op.or]: req.body.tags,
          },
        },
      })
      const result = article.setTags(tags)
      if (result) {
        res.send({ message: 'Article registered successfully with tag!' })
      }
    } else {
      if (article)
        res.send({ message: 'Article registered successfully without tag!' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

exports.getArticles = async (req, res) => {
  await Article.findAll({
    include: [
      {
        model: Tag,
        as: 'tags',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((articles) => {
      return (
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, Accept'
        ),
        res.status(200).json({ articles })
      )
    })
    .catch((err) => {
      console.log('>> Error while retrieving Articles: ', err)
    })
}

exports.getArticle = async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } })
  let tags = []
  try {
    const taglist = await article.getTags()
    if (taglist) {
      for (let i = 0; i < taglist.length; i++) {
        tags.push('#' + taglist[i].name)
      }

      return (
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, Accept'
        ),
        res.status(200).json({ article, tags })
      )
    }
  } catch (error) {
    console.log('>> Error while retrieving Article: ', error)
  }

  // await Article.findOne({ where: { id: req.params.id } })
  //   .then((article) => {
  //     let tags = []
  //     const taglist = article.getTags()
  //     for (let i = 0; i < taglist.length; i++) {
  //       tags.push('#' + taglist[i].name)
  //     }
  //     return (
  //       res.header(
  //         'Access-Control-Allow-Headers',
  //         'Origin, Content-Type, Accept'
  //       ),
  //       res.status(200).json({ article, tags })
  //     )
  //   })
  //   .catch((err) => {
  //     console.log('>> Error while retrieving Article: ', err)
  //   })
}

exports.getArticleByUser = async (req, res) => {
  const article = await Article.findAll({ where: { userId: req.params.id } })
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.status(200).json({ article })
}

exports.updateArticle = async (req, res) => {
  const articleId = req.params.id
  const article = await Article.update(req.body, { where: { id: articleId } })
  res.status(200).json({ article })
}

exports.deleteArticle = async (req, res) => {
  await Article.destroy({ where: { id: req.params.id } })
  res.status(200).send('delete successfuly')
}
