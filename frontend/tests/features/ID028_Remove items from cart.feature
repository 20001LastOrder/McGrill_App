Feature: Remove items to cart
As a user of the McGrill System, I want to remove items into the cart

  Background: 
    Given the system is on the page of a restaurant and logged in as Kurtis
      And the restaurant provides following items
      | Item                | Price | 
      | Double double       | $2    | 
      | Crispy chicken wrap | $6.5  | 
      | Grill chicken wrap  | $6.5  | 
      And the cart already has one double double and two crispy chicken wrap
  
  Scenario Outline: Remove one item from cart (Normal Flow)
     When the customer remove a double double into the cart
     Then the cart should only have two crispy chicken wraps left
  
  Scenario Outline: Remove two item from cart (Alternative Flow)
     When the customer remove two crispy chicken wraps from the cart
     Then the cart should only have one double double left