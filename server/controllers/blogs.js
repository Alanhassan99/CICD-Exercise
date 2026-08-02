const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response, next) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(request.body.comment)
  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'blog doesn`t exist' })
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: 'you are absolutely not authorized, back off' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { returnDocument: 'after' },
  ).populate('user', { username: 1, name: 1 })
  response.status(201).json(updated)
})

module.exports = blogsRouter
