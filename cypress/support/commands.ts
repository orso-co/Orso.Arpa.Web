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
    cy.get('p-dropdown[formControlName="genderId"]')
    .find('.p-dropdown')
    .click({ force: true })
    cy.get('p-dropdown[formControlName="genderId"]')
    .find('.p-dropdown')
    .click({ force: true })
    .find('.p-dropdown-items-wrapper > .p-dropdown-items')
    .click({ force: true })
    .get('.p-dropdown-item')
    .children()
    .first()
    .click({ force: true })
    cy.get('input[formControlName="givenName"]').type(givenname)
    cy.get('input[formControlName="surname"]').type(surname)
    cy.get('input[formControlName="email"]').type(email)
    cy.get('input[formControlName="userName"]').type(username)
    cy.get('p-password[formControlName="password"]').type(password)
    cy.get('p-password[formControlName="confirmPassword"]').type(password)
    cy.get('p-checkbox[formControlName="isNew"]').click()
    cy.get('p-checkbox[formControlName="privacyPolicy"]').click()
    cy.get('textarea[formControlName="aboutMe"]').type("This is a testuser created by cypress. It is only used to test the systems user journey.")
    cy.get('button[type="submit"]').click({force: true})
})

Cypress.Commands.add('deleteUser', (user_name, adminuser, adminpw) => {
    cy.login(adminuser, adminpw)

})

Cypress.Commands.add('logout', () => {
    cy.get('arpa-avatar.ng-star-inserted > .p-element > .p-mr-3').click()
    cy.get('.p-menu-list > :nth-child(1) > .p-ripple').click()
})