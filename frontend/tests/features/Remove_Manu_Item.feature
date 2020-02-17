Feature: Remove menu items

As a McGrill System Restaurant Owner
I would like to remove menu items
So that I can keep the menu up-to-date

  Scenario: Remove One Menu Item (Normal Flow)
    Given user R is logged in as a restaurant owner
      And the item list is initialized
     When the item with the item number of I000001 is requested to be removed
     Then the item I000001 is removed from the list
  
  Scenario: Remove Several Menu Items (Alternative Flow)
    Given user R is logged in as a restaurant owner
      And the item list is initialized
     When the items with the item number of I000001 and I000002 are requested to be removed at the same time
     Then the item I000001 and item I000002 is removed from the list
  
  Scenario: Remove a Menu Item with Invalid item number (Error Flow)
    Given user R is logged in as a restaurant owner
      And the item list is initialized
     When the item with the item number of I00000Invalid is requested to be removed
     Then no item is removed from the list
      And The user is notified that the item number is invalid, an "Invalid Menu Item" messge is issued. 
  
  
