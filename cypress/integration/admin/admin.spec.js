/// <reference types="cypress" />

const category = ['Ноутбуки','Холодильники','Телевизоры','Музыкальные центры']
const testEnv = require('../../fixtures/E2E.json')
const fild = require('../../fixtures/product.json')
const sourseUrl = Cypress.env("baseUrl")



describe('Admin tc', function(){

    
    function take() {
            cy.get('[class="app-mainapp module"]').find('table > tbody')
            .contains('a', category[0]).click()
            return this
        }
    
  
    beforeEach(() => {
        cy.loginAdmin(testEnv[0].username, testEnv[0].password, sourseUrl)
        cy.visit(`${sourseUrl}/admin/login/`)
    })

    it('CHECK category', () => {
        category.forEach(el => {
            cy.get('[class="app-mainapp module"]').find('table > tbody')
                .contains('a', el).should('be.visible')

        })
    })   

    it('ADD product', () => {
        take()
        cy.contains('[class="addlink"]', 'Добавить ноутбук').click()
        cy.get('[class="related-widget-wrapper"]').find('select[id="id_category"]').select('Ноутбуки') 
        cy.get('[id="id_title"]').type(fild.title)
        cy.get('[id="id_description"]').type(fild.description)
        cy.get('[id="id_price"]').type(fild.price)
        cy.get('[id="id_items"]').type(fild.item)
        cy.get('[id="id_diagonal"]').type(fild.resolution)
        cy.get('[id="id_hdd"]').type(fild.HDD)
        cy.get('[id="id_processopr_freq"]').type(fild.Freq)
        cy.get('[id="id_ram"]').type(fild.RAM)
        cy.get('[id="id_time_work"]').type(fild.time)
        cy.get('[id="id_image"]').attachFile('photo/g15-noutbuk-asus-1.jpg', { subjectType: 'drag-n-drop' });
        cy.contains('[class="default"]', 'Сохранить').click()

    })

    it('CHECK new product and delete', () =>{
        take()
        cy.get('div[id="content"]').find('tbody').find('tr').first().as('tr')
        cy.get('@tr').find('td[class="field-title"]').should('have.text', fild.title)
        cy.get('@tr').find('input[id="id_form-0-price"]')
            .should('have.attr', 'value', `${fild.price}.00`)
        cy.get('@tr').find('input[class="action-select"]').check()
        cy.get('div[class="actions"]').find('select').select('Удалить выбранные ноутбуки') 
        cy.contains('button', "Выполнить").click()   
        cy.contains('input', "Да, я уверен").click()
        cy.get('div[id="content"]').find('tbody').find('tr').first().as('tr')
        cy.get('@tr').find('td[class="field-title"]').should('not.have.text', fild.title)
        cy.get('ul.messagelist').contains('Успешно удалены 1').should('be.visible')
              
    })
    


})