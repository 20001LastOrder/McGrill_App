Feature: Add items to cart
As a user of the McGrill System, I want to add items into the cart

  Background: 
    Given the system is on the page of a restaurant
      And the restaurant provides following items
      | Item                | Price | 
      | Double double       | $2    | 
      | Crispy chicken wrap | $6.5  | 
      | Grill chicken wrap  | $6.5  | 
  
  Scenario Outline: Add one copy of one item into cart (Normal Flow)
     When the customer add a double double into the cart
     Then one double double should be listed in the cart
  
  Scenario Outline: Add two copies of one item into cart (Normal Flow)
     When the customer add two crispy chicken wraps into the cart
     Then two crispy chicken wraps are listed in the cart
  
  Scenario Outline: Add two different items with different amount into cart (Normal Flow)
     When the customer add one crispy chicken wrap and two grill chicken wrap into cart
     Then one crispy chicken wrap and two grill chicken wrap should be listed in the cart