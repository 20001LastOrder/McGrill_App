Feature: View User Profile

As a user of the McGrill Application, I would like to view my user profile 
so that I can get my account information.

  Scenario Outline: Different types of users (Normal Flow)
  
    Given user <name> of user type <user_type> with email <email>, password <password> is registered in the McGrill Application System
    Given user <name> is logged into the McGrill Application
     When user <name> requests to view their user profile
     Then user <name> should get the profile containing <user_type>, <email>
    Examples:
      | name            | user_type            | email                     | password      |
      | eelia1          | Customer             | elie.elia@mail.mcgill.ca  | aa0Wdasd01    |
      | johndoe         | Administrator        | john.doe@hotmail.com      | jj00Wasdada3  | 
      | burgerking      | Owner                | burger.king@hotmail.com   | lvWdSdew004   |
      | kaushikpreyansh | Customer             | preyansh.k@mail.mcgill.ca | fdW123ewa3243 |
      | mcdonalds       | Owner                | mcdonalds@hotmail.com     | mr0FSAdqwd05  |
  
  Scenario: Attempting to view user profile when not logged in (Error Flow)
    Given The user has the McGrill Application open on their device
     When The user requests to view their user profile
     Then a "You are not logged in" view profile error message is issued
  
  
