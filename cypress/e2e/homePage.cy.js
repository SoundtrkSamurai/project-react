describe('Home Page', () => {
  beforeEach(() => {
    // Preserve the session to avoid logging in every time
    cy.session('user', () => {
      cy.login('demo@cosdensolutions.io', 'cosdensolutions');
    });
    // Visit the home page
    cy.visit('http://localhost:5173');
  });

  it('renders the home page with the expected elements', () => {
    cy.get('[data-testid="home-page"]').should('exist');
    cy.get('[data-testid="listing-filters"]').should('exist');
    cy.get('[data-testid="listing-list"]').should('exist');
  });

  it('should display the correct number of initial listings', () => {
    const expectedListingsCount = 12; // Adjust this based on your API response

    cy.get('[data-testid="listing-list"] > *').should(
      'have.length',
      expectedListingsCount,
    );
  });

  it('should filter listings based on search input', () => {
    const searchTerm = 'Paris';

    cy.get('[data-testid="listing-filters"] [name="search"]').type(searchTerm);

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').each(($listing) => {
      cy.wrap($listing).contains(searchTerm);
    });

    // Increment the guest stepper to x amount
    const guestCount = 16;
    for (let i = 0; i < guestCount; i++) {
      cy.get('[data-testid="stepper-increment"]').click();
    }

    cy.get('[data-testid="listing-filters-submit"]').click();
    cy.get('[data-testid="listing-list"] > *').each(($listing) => {
      cy.wrap($listing).contains(`${guestCount} Guest`);
    });
  });

  it('should handle "no results scenario"', () => {
    const searchTerm = 'NonExistentPlace';

    cy.get('[data-testid="listing-filters"] [name="search"]').type(searchTerm);

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"]').should('not.exist');
    cy.get('[data-testid="no-results"]').should('exist');
  });
});
