describe('Primera prueba', () => {
  beforeEach(() => {
    cy.request('POST', '/api/login/auth/', {
      username: 'mochoa',
      password: '8312915'
    }).its('body').as('currentUser')
  })
  it('Test login', () => {
    // const { username, password } = this.currentUser
    const username = 'mochoa'
    const password = '8312915'

    cy.visit('http://192.168.2.201:4200')

    cy.contains('ARRIENDOS')

    cy.get('input[name=username]').type(username)

    cy.get('input[name=password]').type(`${password}{enter}`)

    // cy.url().should('include', '/dashboard')

  })
})