/// <reference types="cypress" />


describe('TC 1', function(){
    const sourseUrl = Cypress.env("baseUrl")
    const name = Cypress.env("name")
    const password = Cypress.env("password")

    it('login', () => {
        cy.visit(`${sourseUrl}`)
        cy.login(name, password)
        
    })

    it('contains homepage', () => {
        cy.contains('.alert', `Вы вошли как ${name}.`).should('be.visible')

        cy.get('section[class="py-4"]').as('form')
        cy.get('@form').find('div[class="card h-100"]').should('have.length', 4)
        cy.get('@form').contains("Холодильники").should('be.visible')
        cy.get('@form').contains("Ноутбуки").should('be.visible')
                .parents('div[class="card h-100"]')
                .contains('Перейти').should('be.visible').click().then(()=>{
                        cy.url().should('contain', '/notebook')  
                })
              
    })

    it.only('contains item', () => {
        cy.visit(`${sourseUrl}notebook`)
        cy.login(name, password)
        cy.getCookies()
        cy.visit(`${sourseUrl}notebook`)
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
            cy.get('section[class="py-4"]').eq(2).find('[class="col mb-5"]')
                .first().then(tag => {
                    cy.wrap(tag).find('h5[class="fw-bolder"]').then(getText => {
                        const text = getText.text()
                        cy.wrap(tag).contains('Перейти').click({force: true})
                        cy.get('h5[class="card-title"]').find('b').should('have.text', text)
                        cy.get('span[class="badge bg-dark text-white ms-1 rounded-pill"]')
                            .contains('0').should('be.visible')  
                        cy.get('a[class="btn btn-primary"]').click({forse:true}).then(()=>{
                            cy.get('span[class="badge bg-dark text-white ms-1 rounded-pill"]')
                                .contains('1').should('be.visible')
                        }) 
                    })
                    
            })
    
        })
        
})