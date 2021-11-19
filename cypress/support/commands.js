Cypress.Commands.add('login', (name, password) => {
    cy.contains("Вход").click()
    
    cy.get('#id_login')
        .clear()
        .type(name)
        .should('be.visible')
        .then( text => {
            cy.wrap(text).invoke('prop', "value").should('contain', name)
        })
    cy.get('#id_password').clear().type(password).should('be.visible')
    cy.get('.login').find('.btn').click()

})

