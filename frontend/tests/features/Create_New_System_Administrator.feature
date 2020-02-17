Feature: create new system administrator

As a McGill University administrator, I would like to have management control of McGrill app,
	So that I can make sure the app has a healthy and robust environment.
    
Scenario: create new system administrator (Normail flow)
Given Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is a McGill University administrator with good standing
When Liya Nelson requests to create the system administration account
Then an user with name Liya Nelson and email liya.nelson@mcgill.com is created, a password liyaNelson001 is created

Scenario: create new system administrator with invalid id (Error flow)
Given Amman Sumner with employee id INVALID_ID
When Amman Sumner requests to create the system administration account
Then an "Invalid Employee Id" error is issued.

Scenario: create existing system administrator (Error flow)
Given Liya Nelson with email address liya.nelson@mcgill.ca with employee id em001 is an administrator of the system
When Amman Sumner requests to create the system administration account
Then an "Already Exists" error is issued.
