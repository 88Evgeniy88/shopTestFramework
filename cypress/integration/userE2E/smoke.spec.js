/// <reference types="cypress" />


describe('TC 1', function(){
    const sourseUrl = Cypress.env("baseUrl")

    it('login', () => {
        cy.visit(`${sourseUrl}`)
        cy.contains("Вход").click()
        cy.get('#id_login').clear().type('Admin').should('be.visible').then( text => {
            cy.wrap(text).invoke('prop', "value").should('contain', 'Admin')
        })
        cy.get('#id_password').clear().type('qwert156').should('be.visible')
        cy.get('.login').find('.btn').click()
    })

    it('contains homepage', () => {
        cy.contains('.alert', 'Вы вошли как Admin.').should('be.visible')
        cy.get('section[class="py-4"]').then( form => {
            cy.wrap(form).contains("Холодильники").should('be.visible')
            cy.wrap(form).contains("Ноутбуки").should('be.visible')
                .parents('div[class="card h-100"]')
                .contains('Перейти').should('be.visible').click()
        })
    })

    it('contains ', () => {
        cy.url().should('contain', '/notebook')
    }) 
})