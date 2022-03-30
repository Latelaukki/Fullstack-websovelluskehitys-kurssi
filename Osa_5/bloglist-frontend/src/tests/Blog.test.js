import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import NewBlogForm from '../components/NewBlogForm'

const user = {
  username: 'TestUser',
  password: 'testisalasana',
  name: 'Testinimi',
}

const blog = {
  title: 'Testiblogi',
  author: 'Testikirjoittaja',
  url: 'www.testiurl.fi',
  likes: '2',
  user: user,
}

describe('On default, Blog component', () => {
  test('renders title and author', () => {
    render(<Blog blog={blog} user={user} />)

    const element = screen.getByTestId('blog')

    expect(element).toHaveTextContent('Testiblogi')
    expect(element).toHaveTextContent('Testikirjoittaja')
  })

  test('does not render url and likes', () => {
    render(<Blog blog={blog} user={user} />)
    const element = screen.getByTestId('blog')

    expect(element).not.toHaveTextContent('www.testiurl.fi')
    expect(element).not.toHaveTextContent('likes: 2')
  })
})

describe('When view button is pressed on, Blog component', () => {
  test('renders title, author, url, likes and user', () => {
    render(<Blog blog={blog} user={user} />)

    const button = screen.getByText('view')
    userEvent.click(button)

    const element = screen.getByTestId('blog')

    expect(element).toHaveTextContent('Testiblogi')
    expect(element).toHaveTextContent('Testikirjoittaja')
    expect(element).toHaveTextContent('www.testiurl.fi')
    expect(element).toHaveTextContent('likes: 2')
    expect(element).toHaveTextContent('Testinimi')
  })

  test('shows like button which calls event handler 2 times when pressed 2 times', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} createNewLike={mockHandler} />)

    const button = screen.getByText('view')
    userEvent.click(button)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('<NewBlogForm/> updates parent state and calls onSubmit', () => {
    const createNewBlog = jest.fn()

    render(<NewBlogForm createNewBlog={createNewBlog} />)

    const element = screen.getByTestId('blog-form')

    const title = element.querySelector('#title')
    const author = element.querySelector('#author')
    const url = element.querySelector('#url')
    const sendButton = element.querySelector('#create-button')

    userEvent.type(title, 'otsikko')
    userEvent.type(author, 'kirjoittaja')
    userEvent.type(url, 'www.testi.fi')
    userEvent.click(sendButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('otsikko')
    expect(createNewBlog.mock.calls[0][0].author).toBe('kirjoittaja')
    expect(createNewBlog.mock.calls[0][0].url).toBe('www.testi.fi')
  })
})
