/// <reference types="cypress" />
import Category from '../../support/pageObj/categoryPage.js'
import HomePage from '../../support/pageObj/homePage.js'
import Cart from '../../support/pageObj/cart'


describe('TC Cart', function(){
    const sourseUrl = Cypress.env("baseUrl")
    const name = Cypress.env("name")
    const password = Cypress.env("password")

    it('Pre-conditions', () => {
        cy.login(name, password, sourseUrl)
        cy.visit(`${sourseUrl}`)
        HomePage.getAllCategoty()
            .then(listing => {
            const len = Cypress.$(listing).length;
            for (let n = 0; n < len; n++){ 
                HomePage.getAllCategoty().eq(n)
                    .contains('Перейти')
                    .click({forse:true})
                    
                    Category.getAllItems().first()
                        .find('[class="btn btn-outline-dark mt-auto"]').click()
                    cy.contains('В корзину').click()
                    cy.visit(`${sourseUrl}`)    
            }
            })   
    })

    context('TC', function(){

        beforeEach(() => {
            cy.login(name, password, sourseUrl)
            cy.visit(`${sourseUrl}`)
            HomePage.selectCartInNavbar()
        })

        it('cart math', () => {
            
            let total = 0
            cy.get('tbody').find('tr').then(listing => {
                const len = Cypress.$(listing).length;
                for ( let i = 0; i < len; i++ ){
                    Cart.getSumPriceItem(i).should('be.visible').then( getText => {
                        const s = getText.text()
                        const sum = s.replace(/\D/g, '');
                        total = total + Number(sum)  
                    })      
                }
                Cart.totalPrice().then( getText => {
                    const text = getText.text()
                    const resp = text.replace(/\D/g, '');
                    cy.wrap(Number(resp)).should('be.equal', total)    
                })
            })        
        })

        it('create buy', () => {

            cy.get('a.btn-primary').click()
            cy.get('#id_name').type('name')
            cy.get('#id_telephon').type('25-25-25')
            cy.get('#id_address').type('USA')
            cy.get('select').select('Доставка')
            cy.contains('button', 'Оплатить').click()
            cy.get('.alert > .text-center').should('have.text', 'Заказ успешно добавлен')
            getCartInNavbar(0)


        })

    })


    

    
})