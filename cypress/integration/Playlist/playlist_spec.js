describe('Playlist',  () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/playlists')
        cy.intercept('GET', 'https://api.spotify.com/v1/me', {
            fixture: 'User/me.json'
        }).as('me')
        cy.wait('@me')
    })

    it('should have correct user name on header', () => {
        cy.get('[data-cy=displayName]').should('contain.text', 'Felipe')
        cy.get('[data-cy=button]').should('contain.text', 'Texto')
    })
});