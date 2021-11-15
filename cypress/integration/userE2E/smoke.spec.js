/// <reference types="cypress" />

describe('TC 1', function(){
    const sourseUrl = Cypress.env("baseUrl")

    it('login', () => {
        cy.visit(`${sourseUrl}`)
        cy.contains("Вход").click()
        cy.get('#id_login').clear().type('name').should('be.visible')
        cy.get('#id_password').clear().type('password').should('be.visible')
        cy.get('.login > .btn').click()
    })

})