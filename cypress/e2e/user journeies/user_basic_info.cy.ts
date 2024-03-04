describe('User can manage basic data section in his profile', () => {
    it('Add basic data', () => {
        // Arrange
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get('a[href="/arpa/profile/my-data"]').click({force: true})
        cy.get('#p-tabpanel-1-label').click()
        cy.get('.p-calendar > .ng-tns-c978011413-21').click()
        cy.get(':nth-child(4) > :nth-child(4) > .p-ripple').click()
        cy.get('#email').clear().type('max-mustermann@web.de')
        cy.get('#givenName').clear().type("Max")
        cy.get('#surname').clear().type("Mustermann")
        cy.get('#birthplace').clear().type("Stuttgart")
        cy.get('#aboutMe').clear().type("Cypress test comment.")
        
        // Act
        cy.get('.p-formgroup-inline > p-button.p-element > .p-ripple').click()

        // Assert
        cy.closeToast()
        cy.logout()
        cy.closeToast()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get('a[href="/arpa/profile/my-data"]').click({force: true})
        cy.get('#p-tabpanel-1-label').click()
        cy.get('#givenName').should('have.value', 'Max')
        cy.get('#surname').should('have.value', 'Mustermann')
        cy.get('#birthplace').should('have.value', 'Stuttgart')
        cy.get('#email').should('have.value', 'max-mustermann@web.de')
        cy.get('#aboutMe').should('have.value', 'Cypress test comment.')
    })

    it('User can change basic data', () => {
        // Arrange
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get('a[href="/arpa/profile/my-data"]').click({force: true})
        cy.get('#p-tabpanel-1-label').click()
        cy.get('.p-calendar > .ng-tns-c978011413-21').click()
        cy.get(':nth-child(4) > :nth-child(4) > .p-ripple').click()
        cy.get('#email').clear().type('max-mustermann@web.de')
        cy.get('#givenName').clear().type("Max")
        cy.get('#surname').clear().type("Musterfrau")
        cy.get('#birthplace').clear().type("Heilbronn")
        cy.get('#aboutMe').clear().type("Cypress test comment.")
        cy.get('.p-formgroup-inline > p-button.p-element > .p-ripple').click()
        cy.get('#email').clear().type('max-mustermann@outlook.de')
        cy.get('#givenName').clear().type("Maximilian")
        cy.get('#surname').clear().type("Mustermann")
        cy.get('#birthplace').clear().type("Heilbronn")
        cy.get('#aboutMe').clear().type("Changed test comment, written by cypress.")

        // Act
        cy.get('.p-formgroup-inline > p-button.p-element > .p-ripple').click()

        // Assert
        cy.closeToast()
        cy.logout()
        cy.closeToast()
        cy.fixture('admin').then((data) => {
            cy.login(data.username, data.password)
        })
        cy.get('a[href="/arpa/profile/my-data"]').click({force: true})
        cy.get('#p-tabpanel-1-label').click()
        cy.get('#givenName').should('have.value', 'Maximilian')
        cy.get('#surname').should('have.value', 'Mustermann')
        cy.get('#birthplace').should('have.value', 'Heilbronn')
        cy.get('#email').should('have.value', 'max-mustermann@outlook.de')
        cy.get('#aboutMe').should('have.value', 'Changed test comment, written by cypress.')
    })
})