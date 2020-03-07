Feature: 
As a user of the McGrill System, I want to search a specific restaurant based on resturant location and name.

  Background: 
    Given Kurtis is logged into the system as customer
   Given The following restaurants exist in the system
      | restaurant       | Location            | Food Category | 
      | Boustan          | 8771, Rue Sherbrook | Lebanese      | 
      | Subway           | 6555, Rue Durocher  | Sandwiches    | 
      | Tim Hortons      | 5666, Rue Sherbrook | Coffee        | 
      | Super Sandwiches | 4444, Rue Huchison  | Sandwiches    | 
  
  Scenario: Filter out one category (Normal Flow)
     When Kurtis want to filter Lebanese restaurant
     Then the restaurant Boustan should be listed
  
  Scenario: Filter out another category (Alternative Flow)
     When Kurtis wants to filter out sandwiches restaurant
     Then Subway and super sandwiches should be listed

  Scenario: Filter out non exits catgory (Error Flow)
     When Kurtis wants to filter out Korean restaurant
     Then "No restaurant is korean type" is issued