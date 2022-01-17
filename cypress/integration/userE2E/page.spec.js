const sourseUrl = Cypress.env("baseUrl")

describe('HTML', function(){

    beforeEach(() => {
        cy.visit(`${sourseUrl}`)
    })

    it('header',()=>{
        cy.get('[class="display-4 fw-bolder"]')
            .should('contain', 'Shop for you')
            .should('have.css', 'font-weight', '700')
    })

    it('background',()=>{
        cy.get('[class="bg-dark py-1"]')
            .should('have.css', 'background-color', 'rgb(33, 37, 41)')
    })

    it('navbar',()=>{
        cy.contains('[class="navbar-brand"]', 'EDCONE')
            .should('be.visible')
    })

    it('footer', () => {
        cy.get('[class="m-0 text-center text-white"]')
            .should('have.text', 'Copyright © Your Website 2021')
    })

})