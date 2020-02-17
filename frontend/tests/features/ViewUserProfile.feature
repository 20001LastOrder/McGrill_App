Feature: View User Profile

As a user of the McGrill Application, I would like to view my user profile 
so that I can get my account information.

  Scenario Outline: Different types of users (Normal Flow)
  
    Given user <username> of user type <user_type> with email <email>, password <password> is registered in the McGrill Application System
      And user <username> is logged into the McGrill Application
     When user <username> requests to view their user profile
     Then user <username> should get the profile containing <user_time>, <email> and <address>
  
      | name            | user_type            | email                     | password      | address           | 
      | eelia1          | McGrill Member       | elie.elia@mail.mcgill.ca  | aa0Wdasd01    | 350 Durocher      | 
      | johndoe         | System Administrator | john.doe@hotmail.com      | jj00Wasdada3  | 402 Green St.     | 
      | burgerking      | Restaurant           | burger.king@hotmail.com   | lvWdSdew004   | 390 St. Catherine | 
      | kaushikpreyansh | McGrill Member       | preyansh.k@mail.mcgill.ca | fdW123ewa3243 | 406 Hutch         | 
      | mcdonalds       | Restaurant           | mcdonalds@hotmail.com     | mr0FSAdqwd05  | 395 St. Catherine | 
  
  Scenario: Attempting to view user profile when not logged in (Error Flow)
    Given The user has the McGrill Application open on their device
     When The user requests to view their user profile
     Then a "You are not logged in" error message is issued
  
  
