Feature: Log in as a user

As a user of the system, I want to be able to login the system such that I can use the service provided by the system

      
Scenario: Log into the system successfully (Normal Flow)
	Given An account with email yin.zhang@mail.mcgiil.ca and password 12Wdasew1w2 is already created in the system
	When The user requests to login
     And email is yin.zhang@mail.mcgiil.ca and password is 12Wdasew1w2 
	Then the user shall be successfully logged into the system

Scenario: Log into the system unsuccessfully without registration (Error Flow)
	Given There is no user with email noemail@gmail.com
	 When An user requests to login
      And the email is yin.zhang@mail.mcgiil.ca
     Then the user shall not be logged into the system 
	  And A "Wrong Password or Email" message is issued

Scenario: Log into the system unsuccessfully with registration but wrong password (Error Flow)
	Given An account with email yin.zhang@mail.mcgiil.ca and password 12Wdasew1w2 is already created in the system
	 When The user requests to login
      And email is yin.zhang@mail.mcgiil.ca and password is WRONG_EMAIL 
	 Then the user shall not be logged into the system 
	  And A "Wrong Password or Email" message is issued
