Feature: Add items to cart
As a user of the McGrill System, I want to add items into the cart

  Background: 
    Given the system is on the page of menu page and logged in as Kurtis
  
  Scenario: Add one copy of one item into cart (Normal Flow)
     When Kurtis add a burger into the cart
     Then one burger should be listed in the cart
  
  Scenario: Add two copies of one item into cart (Normal Flow)
     When Kurtis add two fries into the cart
     Then two fries are listed in the cart
