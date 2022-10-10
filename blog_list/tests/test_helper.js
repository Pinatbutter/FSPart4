const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'Diego',
      url: 'facebook.com',
      likes: 2000
    },
    {
      title: 'HTML is hard',
      author: 'Isaac',
      url: 'youtube.com',
      likes: 1
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'youtube' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
}