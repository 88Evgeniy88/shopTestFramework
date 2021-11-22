Cypress.Commands.add('login', (name, password, url) => {
    cy.session([name, password], () => {
        cy.visit(`${url}accounts/login/`)
        cy.get('#id_login')
        .clear()
        .type(name)
        .should('be.visible')
        .then( text => {
            cy.wrap(text).invoke('prop', "value").should('contain', name)
        })
        cy.get('#id_password').clear().type(password).should('be.visible')
        cy.get('.login').find('.btn').click()
        cy.contains('.alert', `Вы вошли как ${name}.`).should('be.visible')
    }) 
})

Cypress.Commands.add('logout', () => {
    cy.contains('[href="/accounts/logout/"]', 'Выйти').should('be.visible').click()
    cy.contains('button[type="submit"]', 'Выйти').click()
    cy.contains('.alert', 'Вы вышли.').should('be.visible')
})
