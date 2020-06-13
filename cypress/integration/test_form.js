describe('Testing out form inputs', function(){
    beforeEach(() => {
        cy.visit('http://localhost:3001/pizza')
    });
    it('test name input', function(){
        cy.get('[data-cy="name"]').type('Sofia Luna').should('have.value', 'Sofia Luna')
    });
    it('Test Check Inputs', function(){
        cy.get('[data-cy="pineapple"]').check().should('be.checked')
        cy.get('[data-cy="onion"]').check().should('be.checked')
        cy.get('[data-cy="pepper"]').check().should('be.checked')
        cy.get('[data-cy="tomatoes"]').check().should('be.checked')
        cy.get('[data-cy="cheese"]').check().should('be.checked')

    })
    it('Pass Form Submit', function(){
        cy.get('[data-cy="submit"]').submit();
    })
})