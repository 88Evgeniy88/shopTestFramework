/// <reference types="cypress" />


describe('TC 1', function(){
    const sourseUrl = Cypress.env("baseUrl")

    it('login', () => {
        cy.visit(`${sourseUrl}`)
        cy.contains("Вход").click()
        cy.url().should('contain', `${sourseUrl}accounts/login/`)
        cy.get('#id_login')
            .clear()
            .type('Admin')
            .should('be.visible')
            .then( text => {
                cy.wrap(text).invoke('prop', "value").should('contain', 'Admin')
            })
        cy.get('#id_password').clear().type('qwert156').should('be.visible')
        cy.get('.login').find('.btn').click()
    })

    it('contains homepage', () => {
        cy.contains('.alert', 'Вы вошли как Admin.').should('be.visible')
        cy.get('section[class="py-4"]').then( form => {
            cy.wrap(form).find('div[class="card h-100"]').should('have.length', 4)
            cy.wrap(form).contains("Холодильники").should('be.visible')
            cy.wrap(form).contains("Ноутбуки").should('be.visible')
                .parents('div[class="card h-100"]')
                .contains('Перейти').should('be.visible').click()
        })
    })

    it.only('contains ', () => {
        cy.visit(`${sourseUrl}/notebook`)
        cy.url().should('contain', '/notebook')
        cy.contains('.nav-item', 'Помощь')
            .should('be.visible').click().then( help => {
                cy.wrap(help).contains('[class="dropdown-item"]','Как оформить заказ')
                    .should('be.visible')
                cy.wrap(help).contains('[class="dropdown-item"]','Гарантия')
                    .should('be.visible')
                });
        cy.get('section[class="py-4"]').eq(2).find('[class="col mb-5"]').each(elem => {
            cy.wrap(elem)
                .should('contain', 'Перейти')
                
            
        })        
    }) 


})