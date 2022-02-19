const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f1",
    username: "akuankka",
    password: "v9kweruh2",
    name: "Seppo Taalasmaa",
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d15f2",
    username: "hessuhopo",
    password: "av234v",
    name: "Teemu Selänne",
    __v: 0
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('a valid user can be added', async () => {
  const newUser = {
    username: "Minni hiiri",
    password: "vfiwuevpwe2",
    name: "Risto Reipas"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.username)

  expect(response.body).toHaveLength(initialUsers.length + 1)
  expect(usernames).toContain(
    'Minni hiiri'
  )
})

test('a new user without username returns code 400', async () => {
  const newUser2 = {
    password: 'awervoaiwervawe',
    name: 'Eero'
  }

  const result = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username was not given')

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user.toJSON())
    }
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
})

test('a new user without password returns code 400', async () => {
  const newUser2 = {
    username: 'TestiUser',
    name: 'Eero'
  }

  const result = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password was not given')

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user.toJSON())
    }
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
})

test('a new user with too short username returns code 400', async () => {
  const newUser2 = {
    username: 'Ko',
    password: 'salasana',
    name: 'Lauri'
  }

  const result = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be at least 3 characters long')

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user.toJSON())
    }
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
})

test('a new user with too short password returns code 400', async () => {
  const newUser2 = {
    username: 'TestiUser',
    password: 'sa',
    name: 'Lauri'
  }

  const result = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password must be at least 3 characters long')

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user.toJSON())
    }
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
})

test('a new user with already existing username returns code 400', async () => {
  const newUser2 = {
    username: 'akuankka',
    password: 'vaweivojaweoriv2',
    name: 'Lauri'
  }

  const result = await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(user => user.toJSON())
    }
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})