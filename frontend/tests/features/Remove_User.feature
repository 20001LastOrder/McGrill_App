Feature: remove a user

As an user of McGrill System, I would like to completely remove my account when I desire, so that I can protect my privacy

Senario: remove an existing user (normal flow):
Given Amman Sumner with email address amman.sumner@mail.mcgill.ca exists the McGrill system
When Amman Sumner with email address amman.sumner@mail.mcgill.ca requests to remove the account
Then User Amman Sumner with email address amman.sumner@mail.mcgill.ca is completely removed from the McGrill system, along with the account information

Senario: remove a non existing user (error flow):
Given Marcel Whitehead with email address marcel.white@mcgill.com is not in the system
When Marcel Whitehead requests to remove the account with email marcel.white@mcgill.com
Then an "USER DOES NOT EXIST" message is issued.
