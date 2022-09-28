const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
  //4b
  test('`id` is the unique identifier', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
  //4b
  test('all blogs returned as json', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.statusCode).toEqual(200)
    expect(blogs.type).toEqual('application/json')
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'HTML is hard'
    )
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  //Fails if note doesnt exist
  //fails if id is invalid
})

describe('addition of a new note', () => {
  //4b
  test ('succeeds with valid data, POST', async () => {
    const newBlog = {
      title: 'How to pass post test',
      author: 'Isaac',
      url: 'youtube',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAfter.map(r => r.title)
    expect(titles).toContain('How to pass post test')
  })
  //4b
  test ('fails with invalid data, noTitle or noUrl', async () => {
    const noTitleBlog = {
      title: '',
      author: 'aNobody',
      url: 'whoknows'
    }
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    const noUrlBlog = {
      title: 'Likes dont define me',
      author: 'aNobody',
      url: ''
    }
    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
  //4b
  test ('without likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'Likes dont define me',
      author: 'aNobody',
      url: 'whoknows'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length+1)
    expect(blogs[blogs.length-1].likes).toEqual(0)
  })
})
describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})

describe('updating a note', () => {
  test ('succeeds to update likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 20
    blogToUpdate.likes += 20

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
    expect(blogsAfter[0].likes).toEqual(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})