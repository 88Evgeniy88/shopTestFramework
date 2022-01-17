class Category {
    
    getAllItems(){
        return cy.get('section[class="py-4"]').eq(2).find('[class="col mb-5"]')
    }

}
module.exports = new Category();