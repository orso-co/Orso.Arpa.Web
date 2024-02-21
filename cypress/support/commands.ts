/// <reference types="cypress" />
Cypress.Commands.add('login', (username, password) => {
    // Arrange
    cy.visit('/login')
    cy.get('#usernameOrEmail').type(username )
    cy.get('#password').type(password )
    cy.get('button[type="submit"]').click()
})