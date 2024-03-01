describe('User can manage his contact info', () => {
    
    it('Add contact information', () => {
        // Arrange
        cy.clearAllCookies()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
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
        cy.closeToast()

        // Act
        cy.logout()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
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
        ccy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('#pr_id_9-table > .p-datatable-tbody > .hasHover > .end > [icon="pi pi-pencil"]')
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('#pr_id_9-table > .p-datatable-tbody > .hasHover > .end > [icon="pi pi-pencil"]').click()
        cy.get('#value').clear().type('max.mustermann@outlook.de')
        cy.get(':nth-child(5) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > #commentInner')
        .clear().type('Changed testcromment written by cypress, only usefully for a test with cypress.')
        
        // Act
        cy.get('arpa-user-contact-data > .p-my-5 > .p-formgroup-inline > .p-text-left > .p-element')
        .click()
        cy.closeToast()
        cy.logout()

        // Assert
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('.hasHover > :nth-child(2)').contains('max.mustermann@outlook.de')
    })

    it('Delete contact information', () => {
        cy.clearAllCookies()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get(':nth-child(5) > .p-ripple > .p-menuitem-icon').click()
        cy.get('#p-tabpanel-3-label').click()
        cy.get('[aria-labelledby="pi pi-envelope"]').click()
        cy.get('.p-my-5 > .p-grid > :nth-child(2) > .form-field-appearance-outline > .p-field > .form-field-wrapper > .form-field-flex > .form-field-infix > .p-element > .p-dropdown > .p-dropdown-label')
        .click()
        cy.get('.end > [icon="pi pi-trash"]').click()
        cy.closeToast()
        cy.logout()
        cy.closeToast()
    })
})