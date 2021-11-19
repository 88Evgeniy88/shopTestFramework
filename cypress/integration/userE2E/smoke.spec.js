/// <reference types="cypress" />
import HomePage from '../../support/pageObj/homePage.js'
import Category from '../../support/pageObj/categoryPage.js'
import homePage from '../../support/pageObj/homePage.js'
import Cart from '../../support/pageObj/cart'

    

describe('TC 1', function(){
    const sourseUrl = Cypress.env("baseUrl")
    const name = Cypress.env("name")
    const password = Cypress.env("password")

    it('navbar and login', () => {
        cy.visit(`${sourseUrl}`)
        cy.contains('.nav-item', 'Помощь')
            .should('be.visible').click().then( help => {
                cy.wrap(help).contains('[class="dropdown-item"]','Как оформить заказ')
                    .should('be.visible')
                cy.wrap(help).contains('[class="dropdown-item"]','Гарантия')
                    .should('be.visible')
                });
        HomePage.getCartInNavbar('0').should('be.visible')        
        cy.login(name, password)
        
    })

    it('contains homepage', () => {
        cy.contains('.alert', `Вы вошли как ${name}.`).should('be.visible')
        cy.contains('b', 'Категории товаров').should('be.visible')
        HomePage.getCategory("Холодильники").should('be.visible')
        HomePage.getCategory("Телевизоры").should('be.visible')
        HomePage.getCategory("Музыкальные центры").should('be.visible')
        HomePage.getCategory("Ноутбуки").should('be.visible')
                .parents('div[class="card h-100"]')
                .contains('Перейти').should('be.visible').click().then(()=>{
                        cy.url().should('contain', '/notebook')  
                })
    })

    it('contains item', () => {
        cy.visit(`${sourseUrl}notebook`)
        cy.login(name, password)
        cy.getCookies()
        cy.visit(`${sourseUrl}notebook`)
        
        Category.getAllItems().each(elem => {
            cy.wrap(elem)
                .should('contain', 'Перейти')
            })
            Category.getAllItems().first().then(tag => {
                    cy.wrap(tag).find('h5[class="fw-bolder"]').then(getText => {
                        const text = getText.text()
                        cy.wrap(tag).contains('Перейти').click({force: true})
                        cy.get('h5[class="card-title"]').find('b').should('have.text', text)
                        HomePage.getCartInNavbar('0').should('be.visible')
                        cy.get('a[class="btn btn-primary"]').click({forse:true}).then(()=>{
                            HomePage.getCartInNavbar('1').should('be.visible')
                        }) 
                    }) 
            })
        })
    
    it('cart', () => {
        cy.visit(`${sourseUrl}`)
        cy.login(name, password)
        homePage.selectCartInNavbar()
        cy.get('.form-control').clear().type(2)
        cy.get('tr').find(':nth-child(3) > form').contains('Обновить').click()
        Cart.getSumPriceItem().then( getText => {
            const s = getText.text()
            const sum = s.replace(/\D/g, '');
            Cart.totalPrice().then( getText => {
                const text = getText.text()
                const resp = text.replace(/\D/g, '');
                cy.wrap(resp).should('contain', sum)
            })
        })         
        cy.get(':nth-child(5) > .btn').click()   
        cy.contains('b', 'нет товара').should('exist')
        cy.contains('[href="/accounts/logout/"]', 'Выйти').should('be.visible').click()
        cy.contains('button[type="submit"]', 'Выйти').click()
        cy.contains('.alert', 'Вы вышли.').should('be.visible')
    })    

})