Feature: View Cart

	As a user of the McGrill System, I want to be able to view my cart, so that I know what I have added to the cart
	
	Background: 
	  Given Jayda Slater is logged into as a customer
		Given the following restaurants exists in the system
      | name       |
      | Food Fresh |
      | Basha10    |
    Given the following food item exists in the system
      | itemName   | restaurant |
      | meat       | Food Fresh |
      | vegetables | Food Fresh |
      | beef plate | Basha10    |
    Given the following items are in the cart of Jayda Slater
      | itemName   | restaurant |
      | meat       | Food Fresh |
      | vegetables | Food Fresh |
      
  Scenario: View cart (Normal Flow)
  	When Jayda Slater requests to view the cart
  	Then the following items are returned
  		| itemName   | restaurant |
      | meat       | Food Fresh |
      | vegetables | Food Fresh |
  
  Scenario: View cart without login (Error Flow)
		Given NonUser is not logged into the system
    When NonUser requests to view the cart
    Then A "Please Login" Message is issued
		