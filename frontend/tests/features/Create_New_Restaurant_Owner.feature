Feature: add new restaurant owner

As a restaurant owner near McGill University, I would like to become a user of McGrill app,
So that I can let my consumers to order food through it. 

  Scenario Outline: create new restaurant owner (Normal Flow)
    Given Restaurant owner <name> with email address <email>, restaurant <rest_name>, restaurant address <addr>
      And A system administrator Kane Kerr with email kane.kerr@cs.mcgill.ca is registered in the system
      And Kane Kerr has logged into the system
     When Kane Kerr requests to create a restaurant owner account
     Then a new user of type restaurant owner <name> with email address <email>, restaurant <rest_name>, restaurant address <addr>, an initial password <pass> is generated
  
      | name           | email             | rest_name  | addr          | pass         | 
      | Bryson Lindsey | b.lin@outlook.com | McDonalds  | 3201 Shebrook | dws212Xsrr   | 
      | Eiliyah Whyte  | E.why@gmail.com   | Tim Hotons | 3231 Shebrook | sadqwedas2Wx | 
      | Brax Salas     | sbrax@gmail.com   | Shebrook   | 3101 Shebrook | asdwX124x    | 
  
  Scenario Outline: create new restaurant owner with missing fields (Error Flow)
    Given Restaurant owner <name> with email address <email>, restaurant <rest_name>, restaurant address <addr>
      And A system administrator Kane Kerr with email kane.kerr@cs.mcgill.ca is registered in the system
      And Kane Kerr has logged into the system
     When Kane Kerr rquests to creat a restaurant owner
     Then a message "Some Fields are missing!" is issued
  
      | name           | email           | rest_name     | addr            | 
      | Bryson Lindsey |                 | McDonalds     | MC Cafeteria    | 
      | Eiliyah Whyte  | E.why@gmail.com | Ven's Pho     |                 | 
      | Brax Salas     | sbrax@gmail.com |               | 3231 University | 
      |                | sbrax@gmail.com | RVC Cafeteria | 3231 University | 
  
  Scenario Outline: create new restaurant owner but the account already exists (Error Flow)
    Given Restaurant owner Bryson Lindsey with email address b.lin@outlook.com, restaurant RVC Cafeteria, restaurant address 3231 University
      And A system administrator Kane Kerr with email kane.kerr@cs.mcgill.ca is registered in the system
      And Kane Kerr has logged into the system
      But A restaurant owner account with retaurant name RVC Cafeteria and email b.lin@outlook.com exists in the system
     When Kane Kerr rquests to creat a restaurant owner
     Then a message "Already Exists!" is issued
  
  
