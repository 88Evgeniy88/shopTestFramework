/// <reference types="cypress" />
import Category from '../../support/pageObj/categoryPage.js'


describe ('TC ItemPage', function(){
    const sourseUrl = Cypress.env("baseUrl")
    const name = Cypress.env("name")
    const password = Cypress.env("password")

    it('item detail full check', () =>{
        cy.login(name, password, sourseUrl)
        cy.visit(`${sourseUrl}`)
        cy.get('section[class="py-4"]').find('[class="col mb-5"]')
            .then(listing => {
            const len = Cypress.$(listing).length;
            for (var n = 0; n < len; n++){ 
                cy.get('section[class="py-4"]').find('[class="col mb-5"]').eq(n)
                    .contains('Перейти')
                    .click({forse: true})

                    Category.getAllItems()
                        .then(listing => {
                        const len = Cypress.$(listing).length;
                        for (var n = 0; n < len; n++ ){
                            Category.getAllItems().eq(n).then( elem => {
                                cy.wrap(elem).contains('Перейти').click()
                                cy.get('[class="text-center mt-5 mb-2"]').then((te) => {
                                    const text=te.text()
                                    expect(text).to.be.oneOf(['Ноутбуки','Холодильники','Телевизоры','Музыкальные центры'])
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
                cy.visit(`${sourseUrl}`)
                }    
            })       

    })

})
    