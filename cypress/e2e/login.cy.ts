describe('E2E Tests for login page', () =>
{
    it('login as admin with correct password should be granted', () => {
       cy.clearAllCookies() // Arrange
       cy.login('admin', 'Pa$$w0rd') // Act
       cy.url().should('include', '/dashboard') // Assert
       cy.logout()
       cy.clearAllCookies()
    })

    it('login with wrong username and password should be denied', () => {
        cy.login('admin2', 'Pa$$w0rdPa$$w0rd') // Arrange/Act
        cy.get('.p-toast-detail').contains('Username or Password invalid') // assert
    })

    it('login with wrong password should be denied', () => {
        cy.login('admin', 'Pa$$w0rdPa$$w0rd') // Act
        cy.get('.p-toast-detail').contains('Username or Password invalid') // assert
    })

    it('login with wrong username should be denied', () => {
        cy.login('admin2', 'Pa$$w0rd') // Act
        cy.get('.p-toast-detail').contains('Username or Password invalid') // assert
    })

    it('login with unacknowleded e-mail adress should be denied', () => {
        // Arrange
        cy.adduser('Max', 'Mustermann', 'max1@domain.com', 'HandOfBlood2', 'Pa$$w0rdPa$$w0rd')

        // Act
        cy.visit('/login')
        cy.login('max1@domain.com', 'Pa$$w0rdPa$$w0rd')

        // Assert
        cy.get('.p-toast-detail').contains('views.Your email address is not confirmed. Please confirm your email address first')
    })
})