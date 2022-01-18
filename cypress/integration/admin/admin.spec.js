/// <reference types="cypress" />

import Category from '../../support/pageObj/categoryPage.js'
const category = ['Ноутбуки','Холодильники','Телевизоры','Музыкальные центры']
const testEnv = require('../../fixtures/E2E.json')
const fild = require('../../fixtures/product.json')
const sourseUrl = Cypress.env("baseUrl")



describe('Admin tc', function(){

    function take() {
            cy.get('[class="app-mainapp module"]')
                .find('table > tbody')
                .contains('a', category[0]).click()
            return this
        }
    
    beforeEach(() => {
        cy.loginAdmin(testEnv[0].username, testEnv[0].password, sourseUrl)
        cy.visit(`${sourseUrl}/admin/login/`)
        })

    it('CHECK category', () => {
        category.forEach(el => {
            cy.get('[class="app-mainapp module"]')
                .find('table > tbody')
                .contains('a', el)
                .should('be.visible')
        })
    })   

    it('ADD product', () => {
        take()
        cy.contains('[class="addlink"]', 'Добавить ноутбук').click()
        cy.get('[class="related-widget-wrapper"]')
            .find('select[id="id_category"]')
            .select(fild.category) 
        cy.get('[id="id_title"]').type(fild.title)
        cy.get('[id="id_description"]').type(fild.description)
        cy.get('[id="id_price"]').type(fild.price)
        cy.get('[id="id_items"]').type(fild.item)
        cy.get('[id="id_diagonal"]').type(fild.resolution)
        cy.get('[id="id_hdd"]').type(fild.HDD)
        cy.get('[id="id_processopr_freq"]').type(fild.Freq)
        cy.get('[id="id_ram"]').type(fild.RAM)
        cy.get('[id="id_time_work"]').type(fild.time)
        cy.get('[id="id_image"]').attachFile(fild.picture, { subjectType: 'drag-n-drop' });
        cy.contains('[class="default"]', 'Сохранить').click()
    })

    it('CHECK new product', () => {
        take()
        cy.get('div[id="content"]')
            .find('tbody > tr')
            .first().as('tr')
        cy.get('@tr')
            .find('td[class="field-title"]')
            .should('have.text', fild.title)
        cy.get('@tr')
            .find('input[id="id_form-0-price"]')
            .should('have.attr', 'value', `${fild.price}.00`)       
    })
    
    it('CHECK new product in shop', () => {
        cy.contains('a', 'Открыть сайт').click()
        cy.contains('div[class="col mb-5"]', fild.category)
            .contains('Перейти').click()
        cy.get('[name="search"]')
            .type(fild.title)
            .should('be.visible') 
        cy.contains('button', 'Искать').click()
        Category.getAllItems()
            .first()
            .find('[class="card-body p-2"]').as('tab')
        cy.get('@tab')
            .contains(fild.title)
            .should('be.visible')
        cy.get('@tab')
            .contains(`${fild.price},00`)
            .should('be.visible')
    })

    it('DELETE new product', () => {
        take()
        cy.get('div[id="content"]')
            .find('tbody')
            .contains('tr', fild.title).as('tr')
        cy.get('@tr')
            .find('input[class="action-select"]').check()
        cy.get('div[class="actions"]')
            .find('select')
            .select(`Удалить выбранные ${(fild.category).toLowerCase()}`) 
        cy.contains('button', "Выполнить").click()   
        cy.contains('input', "Да, я уверен").click()
        cy.get('div[id="content"]')
            .find('tbody > tr')
            .first().as('tr')
        cy.get('@tr')
            .find('td[class="field-title"]')
            .should('not.have.text', fild.title)
        cy.get('ul.messagelist')
            .contains('Успешно удалены 1')
            .should('be.visible')
    })
})