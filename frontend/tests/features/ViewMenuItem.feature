Feature: View menu of the selected restaurant

As a Customer,
I would like to view the menu of the selected restaurant,
So that I can go on ordering food

  Background: 
    Given The following menu items exist for restaurant Boustan in the system
      | item_name     | price | 
      | Chicken Plate | 12    | 
      | Beef Plate    | 12    | 
      | Mixed Plate   | 13    | 
      | Veggie Plate  | 10    | 
      | Poutine       | 6     | 
  
  Scenario: View menu of the selected restaurant (Normal Flow)
    Given User Asim Mccann is loged in as a Customer
     When the user requests the menu items of the restaurant Boustan
     Then the following list of items is returned
      | item_name     | price | 
      | Chicken Plate | 12    | 
      | Beef Plate    | 12    | 
      | Mixed Plate   | 13    | 
      | Veggie Plate  | 10    | 
      | Poutine       | 6     | 
  
  Scenario: View menu of an non-existing restaurant (Error Flow)
  	 Given Restaurant <nonexisting_restaurant> is not in the system
     And User Asim Mccann is loged in as a Customer
     When Asim Mccann requests menu items for the restaurant <nonexisting_restaurant>
     Then an error message "Restaurant does not exist." is issued
