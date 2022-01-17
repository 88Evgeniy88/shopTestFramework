class Cart {

    getSumPriceItem(n){
        return cy.get('tbody > tr').eq(n).find(':nth-child(4)')
    }

    totalPrice (){
        return cy.get('.text-end')
    }
}

module.exports = new Cart()