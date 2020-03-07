Feature: Crerate and Submit Order
  As a user of the McGrill System, I want to be able to submit my order so that I can get food from restarutants

  Background: 
    Given Jayda Slater is logged into as a customer for order
    Given the following restaurants exists in the system for order
      | name       |
      | Food Fresh |
      | Basha10    |
    Given the following food item exists in the system for order
      | itemName   | restaurant |
      | meat       | Food Fresh |
      | vegetables | Food Fresh |
      | beef plate | Basha10    |
    Given the following items are in the cart of Jayda Slater for order
      | itemName   | restaurant |
      | meat       | Food Fresh |
      | vegetables | Food Fresh |

  Scenario: Create and submit an orde (Normal Flow)
    When Jayda Slater requests to submit the items in cart for order
    Then an order is created and the status is pending for order

  Scenario: Create and submit an order with multiple restaurants (Alternative Flow)
    Given Jayda Slater add a new menu item to the cart for order
      | itemName   | restaurant |
      | beef plate | Basha10    |
    When Jayda Slater requests to submit the items in cart for order
    Then Two orders are created and the status is pending for order

  Scenario: Create and submit an order without login (Error Flow)
    Given NonUser is not logged into the system for order
    When NonUser requests to submit the items in cart for order
    Then A "Please Login" Message is issued for order
