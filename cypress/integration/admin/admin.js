/// <reference types="cypress" />

const category = ['Ноутбуки','Холодильники','Телевизоры','Музыкальные центры']
const testEnv = require('../../fixtures/E2E.json')
const sourseUrl = Cypress.env("baseUrl")

describe('Admin tc', function(){

    beforeEach(() => {
        cy.loginAdmin(testEnv[0].username, testEnv[0].password, sourseUrl)
    })

    it('check category', () => {
        cy.visit(`${sourseUrl}admin/login/`)
        category.forEach(el => {
            cy.get('[class="app-mainapp module"]')
                .find('table').find('tbody').contains('a', el).should('be.visible')

        })
    })   

    it('add product', () => {
        cy.visit(`${sourseUrl}admin/login/`)
        cy.get('[class="app-mainapp module"]')
            .find('table').find('tbody').contains('a', category[2]).click()

    })

    


})