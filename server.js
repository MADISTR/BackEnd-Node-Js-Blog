const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//database
const db = require('./app/models')
const Role = db.role
const Tag = db.tag
const Article = db.article
const User = db.user

//Routers
const authRouter = require('./app/routes/authRoutes')
const userRouter = require('./app/routes/userRoutes')
const articleRouter = require('./app/routes/articleRoutes')
const commentRouter = require('./app/routes/commentRoutes')
const tagRouter = require('./app/routes/tagRoutes')

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/articles', articleRouter)
app.use('/api/comments', commentRouter)
app.use('/api/tag', tagRouter)

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })

  Role.create({
    id: 2,
    name: 'admin',
  })
  Tag.create({
    id: 1,
    name: 'Tag#1',
  })

  Tag.create({
    id: 2,
    name: 'Tag#2',
  })
}
