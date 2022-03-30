describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'TestUser',
      username: 'Tester',
      password: 'hyvinmonimutkainenjavaikeasalasana',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Tester')
      cy.get('#password').type('hyvinmonimutkainenjavaikeasalasana')
      cy.get('#login-button').click()
      cy.contains('TestUser is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Tester')
      cy.get('#password').type('hyvinhelppojayksinkertainensalasana')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'Tester',
        password: 'hyvinmonimutkainenjavaikeasalasana',
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testiblogi')
      cy.get('#author').type('Testikirjoittaja')
      cy.get('#url').type('wwww.testiblogi.fi')
      cy.get('#create-button').click()
      cy.contains('Testiblogi')
      cy.contains('Testikirjoittaja')
    })

    beforeEach(function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testiblogi')
      cy.get('#author').type('Testikirjoittaja')
      cy.get('#url').type('wwww.testiblogi.fi')
      cy.get('#create-button').click()
      cy.contains('Testiblogi')
      cy.contains('Testikirjoittaja')
    })

    it('A blog can be liked', function () {
      cy.get('#info-button').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('User which added the blog can remove it', function () {
      cy.get('#info-button').click()
      cy.contains('remove').click()
      cy.contains('Testiblogi deleted')
    })
  })
})
