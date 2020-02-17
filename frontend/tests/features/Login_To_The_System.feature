Feature: Log in as a user

As a user of the system, I want to be able to login the system such that I can use the service provided by the system

  Scenario: Log into the system successfully (Normal Flow)
    Given an account with email "yin.zhang1@mail.mcgill.ca" and password "12Wdasew1w2" is already created in the system
	 When the user provide email is "yin.zhang1@mail.mcgill.ca" and password is "12Wdasew1w2" for login
     When the user requests to login
     Then the user shall be successfully logged into the system
  
  Scenario: Log into the system unsuccessfully without registration (Error Flow)
    Given there is no user with email noemail@gmail.com
     When the user provide email is "noemail@gmail.com" and password is "WRONG_PASSWORD" for login
     When the user requests to login
     Then the user shall not be logged into the system 
     Then A "Wrong Password or Email" message is issued
  
  Scenario: Log into the system unsuccessfully with registration but wrong password (Error Flow)
    Given an account with email "yin.zhang2@mail.mcgill.ca" and password "12Wdasew1w2" is already created in the system
     When the user provide email is "yin.zhang2@mail.mcgiil.ca" and password is "WRONG_PASSWORD" for login
     When the user requests to login
     Then the user shall not be logged into the system 
     Then A "Wrong Password or Email" message is issued
  
