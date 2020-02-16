Feature: Create new consumer
  
  As a member of McGill University, I would like to become a user of McGrill app
  So that I can order food using it.
  The password has to be more than 8 characters with at least one upper case, one lowecase and a number. It can only be combined
  with namebers and alphabetic characters.

  Scenario Outline: Create Consumer User (Normal Flow)
    Given member of McGill <mem_name> with McGill email address <email>, address <street> <city> <zip> and create valid password <password>
    When member of McGill <mem_name> requests to create a new account
    Then a new user of Consumer type with name <mem_name>, email address <email> is added to the system

    Examples: 
      | mem_name       | email                     | street        | city     | zip    | password   |
      | Percy Chen     | percy.chen@mail.mcgill.ca | 3543 Durocher | Montreal | H2X2EX | BBc102si2n |
      | Yin Zhang      | yin.zhang@cs.mcgill.ca    | 3245 du Parc  | Montreal | H2F2E2 | sdI23dssI  |
      | Francesca Frye | francesca.frye1@mcgill.ca | 2342 Shebrook | Montreal | F2X3F2 | scf2W12sdc |

  Scenario Outline: Create Consumer user with Invalid password (Error Flow)
    Given member of McGill <mem_name> with McGillemail address <email>, address <street> <city> <zip> and create invalid password <password>
    When member of McGill <mem_name> requests to create a new account
    Then member of McGill <mem_name> should not be registered

    Examples: 
      | mem_name       | email                      | street        | city     | zip    | password      |
      | Percy Chen     | percy.chen1@mail.mcgill.ca | 3543 Durocher | Montreal | H2X2EX | s123456       |
      | Yin Zhang      | yin.zhang1@cs.mcgill.ca    | 3245 du Parc  | Montreal | H2F2E2 | dasd11233     |
      | Francesca Frye | francesca.frye12@mcgill.ca | 2342 Shebrook | Montreal | F2X3F2 | SDSADAwdwdasd |

  Scenario: an existing account (Error Flow)
    Given Dawood Harrington uses email address dawood.h@mcgill.ca is an user of McGrill System
    When Dawood Harrington request to create a consumer account
    Then an "Already Registered" message is issued
