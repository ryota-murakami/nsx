import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Model } from 'sequelize'
import { Post, Author } from './DB/sequelize'
// @TODO find more straightforwardway to use DataStructure's Posts interface.
import { Post as PostType } from '../DataStructure'
const app = express()
app.use(bodyParser())
app.use(cors())

app.get('/posts', async (req: Request, res: Response<Model<PostType>[]>) => {
  const posts = await Post.findAll<Model<PostType>>({
    include: { model: Author, as: 'author' },
    attributes: { exclude: ['authorId'] },
  })

  res.json(posts)
})

app.get('/post/:id', async (req: Request, res: Response) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    include: { model: Author, as: 'author' },
    attributes: { exclude: ['authorId'] },
  })

  res.json(post)
})

app.post('/signup', async (req: Request, res: Response) => {
  const body = req.body
  if (!(body?.name && body?.password)) {
    return res.status(400).json({ error: 'Data not formatted properly' })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)

  try {
    const author = await Author.create({
      name: body.name,
      password: hash,
    })

    res.status(201).send(author)
  } catch (error) {
    res.send(500)
  }
})

app.post('/login', async () => {
  //@TODO
})

export default app
