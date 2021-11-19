class Cart {

    getSumPriceItem (){
        return cy.get('tbody > tr').first().find(':nth-child(4)')
    }

    totalPrice (){
        return cy.get('.text-end')
    }
}

module.exports = new Cart()