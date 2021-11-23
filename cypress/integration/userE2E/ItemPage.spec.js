/// <reference types="cypress" />
import Category from '../../support/pageObj/categoryPage.js'
import HomePage from '../../support/pageObj/homePage.js'

const testEnv = require('../../fixtures/E2E.json')

describe ('TC ItemPage', function(){
    const sourseUrl = Cypress.env("baseUrl")
    const category = ['Ноутбуки','Холодильники','Телевизоры','Музыкальные центры']

    beforeEach(()=>{
        cy.login(testEnv[1].username, testEnv[1].password, sourseUrl)
        cy.visit(`${sourseUrl}`)
    })

    after(() => {
        cy.logout()
    })

    it('Item detail full check', () =>{
        
        HomePage.getAllCategoty()
            .then(listing => {
            const len = Cypress.$(listing).length;
            for (var n = 0; n < len; n++){ 
                HomePage.getAllCategoty().eq(n)
                    .contains('Перейти')
                    .click({forse: true})

                    Category.getAllItems()
                        .then(listing => {
                        const len = Cypress.$(listing).length;
                        for (var n = 0; n < len; n++ ){
                            Category.getAllItems().eq(n).then( elem => {
                                cy.wrap(elem).find('div[class="text-center"]')
                                    .contains('p', 'Остатки:').should('be.visible')
                                cy.wrap(elem).find('div[class="text-center"]')
                                    .contains('Перейти').click()
                                cy.get('[class="text-center mt-5 mb-2"]').then((te) => {
                                    const text=te.text()
                                    expect(text).to.be.oneOf(category)
                                })
                                    
                                cy.get('p[class="card-text"]').first().should('not.be.empty')
                                cy.contains('b', 'подробнее...').click({forse : true})
                                cy.get('tbody > tr').each( el => {
                                    cy.wrap(el).find('td').should('not.be.empty')
                                    })
                                cy.go('back')
                            })
                        }
                    })
                
                }    
            })       

    })

    it ('Check item search fild', () =>{
        
        HomePage.getAllCategoty()
            .then(listing => {
            const len = Cypress.$(listing).length;
            for (var n = 0; n < len; n++){ 
                HomePage.getAllCategoty().eq(n)
                    .contains('Перейти')
                    .click()
                    Category.getAllItems().first().find('h5[class="fw-bolder"]').then( getText => {
                        const text = getText.text()
                        cy.get('[name="search"]').type(text).should('be.visible') 
                        cy.contains('button', 'Искать').click()
                        Category.getAllItems().first().find('h5[class="fw-bolder"]').should('have.text', text)
                    })
            }
            })    
    })
})
    