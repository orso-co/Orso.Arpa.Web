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
        cy.get('.hasHover > :nth-child(2)').contains('max.mustermann@gmail.com')
        cy.get('.hasHover > :nth-child(4)').contains('business')
        cy.get('.hasHover > :nth-child(5)').contains('Testcomment written by cypress, only usefully for a test with cypress.')
    })

    it('Change contact information', () => {
        // Arrange
        cy.clearAllCookies()
        cy.login('admin', 'Pa$$w0rd')
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('[icon="pi pi-pencil"]').click()
        cy.get('#value').clear()
        cy.get('#value').type('max.mustermann@outlook.de')
        cy.get(':nth-child(5) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .clear()
        cy.get(':nth-child(5) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .type('Changed testcomment written by cypress, only usefully for a test with cypress.')

        // Act
        cy.get('arpa-user-contact-data > .p-my-5 > .p-formgroup-inline > .p-text-left > .p-element')
        .click()
        cy.logout()

        // Assert
        cy.login('admin', 'Pa$$w0rd')
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('.hasHover > :nth-child(2)').contains('max.mustermann@outlook.de')
        cy.get('.hasHover > :nth-child(5)')
        .contains('Changed testcomment written by cypress, only usefully for a test with cypress.')
    })

    it('Delete contact information', () => {
       cy.clearAllCookies()
        cy.login('admin', 'Pa$$w0rd')
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('.end > [icon="pi pi-trash"]').click()
        cy.logout()
    })

    it('Add adress data', () => {
        // Arrange
        cy.clearAllCookies()
        cy.login('admin', 'Pa$$w0rd')
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
        cy.logout()

        // Assert
        cy.login('admin', 'Pa$$w0rd')
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
        cy.logout()
    })

    //TODO change adress delete adress
})