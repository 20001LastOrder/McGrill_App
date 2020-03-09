Feature: Remove items to cart
As a user of the McGrill System, I want to remove items into the cart

  Background: 
    Given the system has restaurant Tim Hortons and logged in as Kurtis
    Given the cart of Kurtis already has one double double and two crispy chicken wrap
    
  Scenario: Remove one item from cart (Normal Flow)
     When Kurtis remove a burger from the cart
     Then the cart should only have one fries left