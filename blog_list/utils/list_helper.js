const _ = require ('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const total = (likes, item) => likes+item.likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
  let maxIndex = 0
  let maxLikes = 0
  if(blogs.length === 0)
    return maxLikes

  blogs.forEach((blog, index) => {
    if(blog.likes > maxLikes) {
      maxIndex = index
      maxLikes = blog.likes
    }
  })
  let favorite = _.omit(blogs[maxIndex], ['_id'], ['url'], ['__v'])

  /* Omitting without lodash
  delete favorite._id
  delete favorite.url
  delete favorite.__v
  */
  return favorite
}

const mostBlogs = (blogs) => {
  let maxBlogs = 0;
  let maxAuthor = 'i';
  let author = _.groupBy(blogs, blog => {return blog.author})
  _.forEach(author, blog => {
    if(blog.length > maxBlogs){
      maxBlogs = blog.length
      maxAuthor = blog[0].author
    }
  })
  let biggestBlogger= {'author': maxAuthor, 'blogs':maxBlogs}
  return biggestBlogger
}

const mostLikes = (blogs) => {
  let maxLikes = 0;
  let likes = 0;
  let maxAuthor = 'i';
  let author = _.groupBy(blogs, blog => {return blog.author})
  _.forEach(author, collection => {
    collection.forEach(blog => {
      likes += blog.likes
    })
    if(likes > maxLikes){
      maxLikes = likes
      maxAuthor = collection[0].author
    }
    likes = 0
  })
  let mostLikedAuthor = {'author': maxAuthor, 'likes': maxLikes}
  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}