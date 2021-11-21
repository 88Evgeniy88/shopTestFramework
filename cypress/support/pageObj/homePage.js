class HomePage {

    getCartInNavbar(n){
        return cy.get('span[class="badge bg-dark text-white ms-1 rounded-pill"]')
                .contains(n)
    }

    selectCartInNavbar(){
        return  cy.get('span[class="badge bg-dark text-white ms-1 rounded-pill"]').click({forse: true})
    }

    getCategory(name){
        return cy.get('section[class="py-4"]').contains(name)
    }

    getAllCategoty(){
        return cy.get('section[class="py-4"]').find('[class="col mb-5"]')
    }



}

module.exports = new HomePage();