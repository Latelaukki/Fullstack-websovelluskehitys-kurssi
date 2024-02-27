const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
//const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!  
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      return Book.find({})
    },
    allAuthors: async () => {
      return Author.find({})
    },
    authorCount: async () => Author.collection.countDocuments(),
  },
  Book: {
    author: async (root) => {
      return {
        name: root.author.name
      }
    }
  },
  Author: {
    bookCount: async (root, args) => {
      let books = await Book.find({author: root.id})
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null})
        await author.save()
      }
      const book = new Book({ ...args , author: author})
      return book.save()
    },
    editAuthor: async (root, args) => {
      console.log(args)
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
