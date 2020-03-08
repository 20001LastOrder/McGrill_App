Feature: Search restaurant(s)
As a user of the McGrill System, I want to search a specific restaurant based on resturant location and name.

  Background: 
    Given Kurtis is logged in as customer
      Given the following restaurants exist in the system for search
      | restaurant  | 
      | Boustan     | 
      | Subway      | 
      | Tim Hortons | 
  
  Scenario: Search restaurant using name (Normal Flow)
     When Kurtis searches for Boustan
     Then the restaurant Boustan should be listed for search

       
  Scenario Outline: Non-existing Restaurant (Error Flow)
     When Kurtis searches for KFC
     Then no restaurant should be listed