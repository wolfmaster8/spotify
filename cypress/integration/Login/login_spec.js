describe("Login", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('should verify login link', () => {
        cy.get("[data-cy=loginButton]").should('have.text', 'Login')
        cy.get("[data-cy=loginButton]").should('have.attr', 'href').and('include', 'https://accounts.spotify.com/authorize')
    })

    it('button should change color', () => {

        cy.get('[data-cy=colorButton]').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        cy.get('[data-cy=colorButton]').should('have.text', 'Troca de cor')
        cy.get('[data-cy=colorButton]').click()
        cy.get('[data-cy=colorButton]').should('have.css', 'background-color', 'rgb(0, 0, 255)')

    })

    it('should list have correct names', () => {
        cy.wait(5000)
        cy.get('[data-cy=list] > .album').first().get('img')
            .trigger('mouseover')
            .get('.playButton')
            .should('have.css', 'display', 'block')

        cy.get('ul > li').should(($list) => {
            expect($list.eq(0)).to.contain.text('Jordana')
            expect($list.eq(1)).to.contain.text('Roberto')
            expect($list.eq(2)).to.contain.text('Felipe')
        })
    })

})