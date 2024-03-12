describe('User can manage his profile picture', () => {
    it('user can upload profile picture', () => {
        // Arrange
        cy.clearAllCookies()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-0-label').click()
        //cy.get('input[type=file').selectFile('./cypress/fixtures/profile.png')

    })
})