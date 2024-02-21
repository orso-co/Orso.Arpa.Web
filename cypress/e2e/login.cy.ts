describe('Tests for login page', () =>
{
    it('login as admin with correct password should be granted', () => {
       cy.login('admin', 'Pa$$w0rd') // Act
       cy.url().should('include', '/dashboard') // Assert
    })

    it('login with wrong username and password should be denied', () => {
        cy.login('admin2', 'Pa$$w0rdPa$$w0rd') // Act
        cy.get('.p-toast-detail').contains('Username or Password invalid') // assert
    })

    it('login with unacknowleded e-mail adress should be denied', () => {
        // TODO
    })
})