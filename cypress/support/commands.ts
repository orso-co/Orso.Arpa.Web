/// <reference types="cypress" />
Cypress.Commands.add('login', (username, password) => {
    // Arrange
    cy.visit('/login')
    cy.get('#usernameOrEmail').type(username )
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('adduser', (givenname, surname, email, username, password) => {
    cy.clearAllCookies()
    cy.visit('/login')
    cy.get('p-button[id="loginpage.register"]').click()
    cy.get('input[formControlName="givenName"]').type(givenname)
    cy.get('input[formControlName="surname"]').type(surname)
    cy.get('input[formControlName="email"]').type(email)
    cy.get('input[formControlName="userName"]').type(username)
    cy.get('p-password[formControlName="password"]').type(password)
    cy.get('p-password[formControlName="confirmPassword"]').type(password)
    cy.get('p-checkbox[formControlName="isNew"]').click()
    cy.get('p-checkbox[formControlName="privacyPolicy"]').click()
    cy.get('textarea[formControlName="aboutMe"]').type("This is a testuser created by cypress. It is only used to test the systems user journey.")
    cy.get('button[type="submit"]').click()
})