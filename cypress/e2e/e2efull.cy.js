function signUp(email) {
    cy.log("Fill all details in sign up");
    cy.get('[data-qa="signup-name"]').type("az antor");
    cy.get('[data-qa="signup-email"]').type(email);
    cy.log('Click on sign up');
    cy.get('[data-qa="signup-button"]').click();
  }
  
  describe('Automation the full scenario', () => {
    beforeEach(() => {
      // Visit the homepage and verify its visibility
      cy.visit('https://automationexercise.com/')
      cy.get('.active > :nth-child(1) > h1').should('contain', 'AutomationExercise');
    });
  
    it('Tests the full flow of buying products', () => {
      // Add a product to the cart
      cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
      cy.get('u').click()
  
      // Verify that cart page is displayed
      cy.url().should('eq', 'https://automationexercise.com/view_cart');
      cy.get('.col-sm-6 > .btn').click()
  
      // Click 'Register / Login' button
      cy.get('.modal-body > :nth-child(2) > a > u').click()
  
      // Fill in sign up details
      const email = `azantor22+${Cypress._.random(1, 100)}@gmail.com`;
      signUp(email);
  
      // Fill in additional account details
      cy.get('[data-qa="password"]').type('1234569');
      cy.get('[data-qa="first_name"]').type('arifuz');
      cy.get('[data-qa="last_name"]').type('antor');
      cy.get('[data-qa="address"]').type('Dhaka');
      cy.get('[data-qa="country"]').select('India');
      cy.get('[data-qa="state"]').type('Dhaka');
      cy.get('form > :nth-child(18)').type('Mymensing');
      cy.get('[data-qa="zipcode"]').type('1307')
      cy.get('[data-qa="mobile_number"]').type('01775111225')
      cy.get('[data-qa="create-account"]').click();
  
      // Verify account created and continue
      cy.url().should('include', 'automationexercise.com/account_created');
      cy.get('[data-qa="continue-button"]').click()
  
      // Verify "logged in as username" at the top
      cy.get(':nth-child(10) > a').should('contain', 'Logged in as az antor');
  
      // Go to cart and proceed to checkout
      cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
      cy.get('.col-sm-6 > .btn').click()
  
      // Verify "Address Details" section
      cy.get(':nth-child(2) > .heading').should('contain', 'Address Details');
      cy.get('#address_delivery').should('be.visible');
      cy.get('#address_delivery > :nth-child(4)').should('contain', 'Dhaka');
      cy.get('#address_delivery > .address_phone').should('contain', '01775111225');
  
      // Verify "Review Your Order" section
      cy.get(':nth-child(4) > .heading').should('contain', 'Review Your Order');
      cy.get('.cart_description > h4').should('contain', 'Blue Top');
      cy.get('.cart_price > p').should('contain', 'Rs. 500');
      cy.get('.quantity').should('contain', 'Quantity');
      cy.get('.total').should('contain', 'Total');
      cy.get('.cart_total > .cart_total_price').should('contain', 'Rs. 500');
      cy.get('h4 > b').should('contain', 'Total Amount');
  
      // Enter description and place order
      cy.get('.form-control').type('Description');
      cy.get(':nth-child(7) > .btn').click();
  
      // Enter payment details
      cy.get('[data-qa="name-on-card"]').type('Card Name');
      cy.get('[data-qa="card-number"]').type('4111111111111111');
      cy.get('[data-qa="cvc"]').type('123');
      cy.get('[data-qa="expiry-month"]').type('12');
      cy.get('[data-qa="expiry-year"]').type('2028');
      cy.get('[data-qa="pay-button"]').click();
  
      // Verify the success message "Your order has been confirmed!"
      cy.get('.col-sm-9 > p').should('contain', 'Your order has been confirmed!');
    });
  });
  