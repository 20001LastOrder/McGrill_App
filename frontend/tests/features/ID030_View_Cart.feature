Feature: View Cart

As a user of the McGrill System, I want to add items into the cart

  Background: 
    Given the system is on the page of menu page and logged in as Yiin to view order
  
  Scenario: View one copy of one item into cart (Normal Flow)
     Given Yiin add a burger into the cart
     When Yiin requests to view the cart
     Then one burger should be listed
  
  Scenario: View two copies of one item into cart (Normal Flow)
     Given Yiin add two fries into the cart
     When Yiin requests to view the cart
     Then two fries are listed