const listHelper = require('../utils/list_helper')
const blogs = require('../utils/list_input_helper').blogList

describe.skip('dummy function', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe.skip('total likes', () => {
  test('Equals the total likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe.skip('First blog with most likes', () => {
  test('Equals favorite blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    const favBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(favBlog)
  })
})

describe.skip('Author with the most blogs', () => {
  test('Equals biggest blogger', () => {
    const result = listHelper.mostBlogs(blogs)
    const biggestBlogger = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(biggestBlogger)
  })
})

describe.skip('Author with the most likes overall', () => {
  test('Equals most liked author', () => {
    const result = listHelper.mostLikes(blogs)
    const mostLiked = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(mostLiked)
  })
})