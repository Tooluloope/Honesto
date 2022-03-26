describe('My First Test', () => {
  it('Login to app', () => {
    cy.visit('http://localhost:3000/')
    cy.get('input').type('John Smith{enter}')
    cy.get('button').click()
  })

  it('Logout from app', () => {
    cy.contains('Logout').click()
  })
})

export {}
