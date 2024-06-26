const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      allBooks: async (root, args) => {
        if (!args.genre) {
          return Book.find({}).populate('author')
        }
        return Book.find({ genres: args.genre }).populate('author')
      },
      allAuthors: async () => {
        return Author.find({})
      },
      authorCount: async () => Author.collection.countDocuments(),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      bookCount: async (root, args) => {
        return Book.find({ author: root }).count()
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, born: null})
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        }
  
        const book = new Book({ ...args, author: author})
  
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
  
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing year born failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }
  module.exports = resolvers