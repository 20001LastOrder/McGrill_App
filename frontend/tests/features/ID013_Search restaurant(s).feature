Feature: Search restaurant(s)
As a user of the McGrill System, I want to search a specific restaurant based on resturant location and name.

  Background: 
    Given Kurtis is logged in as customer
      And The following restaurants exist in the system
      | restaurant  | Location            | 
      | Boustan     | 8771, Rue Sherbrook | 
      | Subway      | 6555, Rue Durocher  | 
      | Tim Hortons | 5666, Rue Sherbrook | 
  
  Scenario Outline: Search restaurant using name (Normal Flow)
     When Kurtis searches for Boustan
     Then the restaurant Boustan should be listed
  
  Scenario Outline: Search restaurant using location (Alternative Flow)
     When Kurtis searches for restaurant on Rue Sherbrook
     Then Tim Hortons and Boustan should be listed
  
  Scenario Outline: Search restaurant using half name (Alternative Flow)
     When Kurtis searches for Subway but used sub to search
     Then the restaurant Subway should be listed

       
  Scenario Outline: Non-existing Restaurant (Error Flow)
     When Kurtis searches for KFC
     Then no restaurant should be listed