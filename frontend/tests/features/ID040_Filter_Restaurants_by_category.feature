Feature: Filter restaurant by category
As a user of the McGrill System, I want to search a specific restaurant based on resturant location and name.

  Background: 
    Given Kurtis is logged into the system as a customer for filter restaurant by category
   Given The following restaurants exist in the system for filter restaurant by category
      | restaurant       | Food Category | 
      | Boustan          | Lebanese      | 
      | Subway           | Sandwiches    | 
      | Tim Hortons      | Coffee        | 
      | Super Sandwiches | Sandwiches    | 
  
  Scenario: Filter out one category (Normal Flow)
     When Kurtis want to filter Lebanese restaurant
     Then the restaurant Boustan should be listed
  Scenario: Filter out non exits catgory (Error Flow)
     When Kurtis wants to filter out Korean restaurant
     Then "No restaurant is korean type" is issued