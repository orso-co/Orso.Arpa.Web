describe('User is able to make crud operations to his bankaccount', () => {
    it('Add bankaccount', () => {
        // Arrange
        cy.clearAllCookies()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-4-label').click()
        cy.get('#iban').type('DE02120300000000202051')
        cy.get('#bic').type('BYLADEM1001')
        cy.get('#accountOwner').type('Max Mustermann')
        cy.get(':nth-child(4) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .type('Automized comment with cypress, for testing only.')

        //Act
        cy.get('arpa-user-bankdata > .p-my-5 > .p-formgroup-inline > .p-text-left > .p-element').click()
        cy.closeToast()
        cy.logout()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-4-label').click()

        // Assert
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > :nth-child(2)')
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > :nth-child(1)').contains('DE02120300000000202051')
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > :nth-child(2)').contains('BYLADEM1001')
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > :nth-child(3)').contains('Max Mustermann')
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > :nth-child(4)')
        .contains('Automized comment with cypress, for testing only.')
    })

    it('Delete bankaccount', () => {
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-4-label').click()
        cy.get('#pr_id_10-table > .p-datatable-tbody > .hasHover > .end > .p-element > .p-button-icon').click()
        cy.closeToast()
        cy.logout()
    })
})