const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((most, b) => most > b.likes ? most : b.likes, 0)
  return blogs.filter((b) => b.likes === mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}