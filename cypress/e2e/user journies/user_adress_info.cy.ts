describe('User can manage adress information', () => { 
    it('Add adress data', () => {
        // Arrange
        cy.clearAllCookies()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-2-label').click()
        cy.get('#address1').type('Max-Von-Egal Str.')
        cy.get('#address2').type('2')
        cy.get('#urbanDistrict').type('Neustadt')
        cy.get('#city').type('Mainz')
        cy.get('#zip').type('88250')
        cy.get('#state').type('RLP')
        cy.get('#country').type('Deutschland')
        cy.get(':nth-child(9) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .type('Cypress test comment, only usefule to cypress.')
        cy.get(':nth-child(8) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('[ng-reflect-label="Business"] > .p-ripple').click()
        
        // Act
        cy.get('arpa-user-addressdata > .p-my-5 > .p-formgroup-inline > .p-text-left > .p-element')
        .click()
        cy.closeToast()
        cy.logout()

        // Assert
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-2-label').click()
        cy.get('.hasHover > :nth-child(1)').contains('Max-Von-Egal Str.')
        cy.get('.hasHover > :nth-child(2)').contains('Mainz')
        cy.get('.hasHover > :nth-child(3)').contains('88250')
        cy.get('.hasHover > :nth-child(4)').contains('Deutschland')
        cy.get('#pr_id_7-table > .p-datatable-tbody > :nth-child(1) > :nth-child(5)')
        .contains('RLP')
        cy.get('.hasHover > :nth-child(6)').contains('Cypress test comment, only usefule to cypress.')
        cy.get('.end > [icon="pi pi-trash"]').click()
        cy.closeToast()
        cy.logout()
    })
})