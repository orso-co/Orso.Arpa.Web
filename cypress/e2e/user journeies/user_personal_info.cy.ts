describe('User can manage his contact info', () => {
    
    it('Add contact information', () => {
        // Arrange
        cy.clearAllCookies()
        cy.login('admin', 'Pa$$w0rd')
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('[ng-reflect-label="Business"] > .p-ripple > .ng-star-inserted')
        .click()
        cy.get('#value').type('max.mustermann@gmail.com')
        cy.get('.p-rating > :nth-child(5)').click()
        cy.get(':nth-child(5) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .type('Testcomment written by cypress, only usefully for a test with cypress.')
        cy.get('arpa-user-contact-data > .p-my-5 > .p-formgroup-inline > .p-text-left > .p-element > .p-button-icon').click()

        // Act
        cy.logout()
        cy.login('admin', 'Pa$$w0rd')
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()

        // Assert

    })

    //TODO
    // change personal data, delete personal data
})