Feature: add new restaurant owner

As a restaurant owner near McGill University, I would like to become a user of McGrill app,
So that I can let my consumers to order food through it. 

  Scenario Outline: create new restaurant owner (Normal Flow)
    Given Restaurant owner <name> with email address <email>, address <addr> <city> <zip>, restaurant <rest_name>, restaurant address <rest_addr> <rest_city> <rest_zip>, password <pass>
     When requests to create a restaurant
     Then a new user of type restaurant owner <name> with email address <email>, address<addr> <city> <zip>, restaurant <rest_name>, restaurant address <rest_addr> <rest_city> <rest_zip>, password <pass> is generated
  
      | name           | email             |addr          |city        |zip         | rest_name  |rest_addr      |rest_city   |rest_zip   | pass         | 
      | Bryson Lindsey | b.lin@outlook.com |4455 Durocher |Montreal    |H2F2E2      | McDonalds  | 3201 Shebrook |Montreal    |H2F3E3     | dws212Xsrr   | 
  
  Scenario Outline: create new restaurant owner with missing fields (Error Flow)
    Given Restaurant owner <name> with email address <email>, address <addr> <city> <zip>, restaurant <rest_name>, restaurant address <rest_addr> <res_city> <res_zip>, password <pass>
    When rquests to creat a restaurant
    Then a message "Some Fields are missing!" is issued
  
      | name           | email             |addr          |city        |zip         | rest_name  |rest_addr      |rest_city   |rest_zip   | pass         | 
      | Bryson Sarah   |                   |4455 Durocher |Montreal    |H2F2E2      | McDonalds  | 3201 Shebrook |Montreal    |H2F3E3     | dws212Xsrr   | 
  
  Scenario Outline: create new restaurant owner but the account already exists (Error Flow)
    Given Restaurant owner Bryson Lindsey with email address b.lin@outlook.com, restaurant RVC Cafeteria, restaurant address 3231 University
     When A restaurant owner account with retaurant name RVC Cafeteria and email b.lin@outlook.com exists in the system
     When rquests to create a restaurant 
     Then a message "Already Exists!" is issued
  
  
