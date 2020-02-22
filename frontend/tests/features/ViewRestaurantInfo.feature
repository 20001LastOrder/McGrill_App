Feature: View Restaurant Information 
As a user of the McGrill System, I want to view an overview of a restaurant's information including location, cuisine type and opening hours
So that I can choose the restaurant I want.

  Scenario Outline: Existing Restaurant (Normal Flow)
    Given A restaurant with <restaurant>, <street>, <city> and <zip> is in the system
     When The User Tom requests the details for <restaurant>
     Then A restaurant information containing <restaurant>, <street>, <city> and <zip> is generated
    Examples: 
      | restaurant | street        | city     | zip    | 
      | Boustan    | 3234 Du Parc  | Montreal | H2X2ED | 
      | Subway     | 1245 Shebrook | Montreal | H2D1F3 | 
  
  Scenario Outline: Non-existing Restaurant (Error Flow)
    Given The following restaurants does not exist in the system
      | nonexisting_restaurant | 
      | Cafe Arabica           | 
      | Damas                  | 
     When The User Tom requests the details for <restaurant>
     Then A restaurant information containing <restaurant> is not generated
    Examples: 
      | restaurant             | 
      | Cafe Arabica           | 
      | Damas                  | 
  
