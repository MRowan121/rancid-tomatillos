/// <reference types="cypress" />
// @ts-check

describe('Home page', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {fixture: 'movies'})
      cy.visit('http://localhost:3000/')
    })

    it('should have a search bar and select input fields', () => {
        cy.get('form')
          .get('input[type="text"]')
          .get('input[placeholder="Search.."]')
          .type('Mulan')
          .should('have.value', 'Mulan')
    })

    it('should show an error message if the user clicks search with an empty search input', () => {
        cy.get('form')
          .get('input[type="text"]')
          .get('button')
          .click()
          
        cy.get('.swal-modal')
          .should('be.visible')
    })

    it('should have a list of movie options from the search bar', () => {
        cy.get('#titles option')
          .should('have.length', 3)
    })

    it('should be able to open movie details when user clicks submit', () => {
        cy.get('input')
          .type('Black Adam')
          .get('button')
          .click()
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {fixture: 'movieDetails'})
        cy.url()
          .should('eq','http://localhost:3000/436270')
    })

    it('should display movies on the page', () => {
        cy.get('a[href="/436270"]')
          .should('be.visible') 
        cy.get('a[href="/724495"]')
          .should('be.visible')
        cy.get('a[href="/1013860"]')
          .should('be.visible')
    })

    it('should be able to open movie details when user clicks poster', () => {
      cy.get('.movieContainer').children()
        .first()
        .click()
      cy.url()
        .should('eq', 'http://localhost:3000/436270')
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/436270', {fixture: 'movieDetails'})
      cy.get('.title')
        .should('contain', 'Black Adam')
    })

    it('should not open the wrong poster when the user clicks a poster', () => {
        cy.get('.movieContainer').children()
          .first()
          .click()
        cy.url().should('not.eq', 'http://localhost:3000/760104')
    })

})