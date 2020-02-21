Feature: View Restaurant Information 
	As a user of the McGrill System, I want to view an overview of a restaurant's information including location, cuisine type and opening hours
    So that I can choose the restaurant I want.
    
    Background:
    	Given A user name Tom is in the system and is loged in (Normal Flow)
        And The following restaurants exist in the system
        | restaurant	| opening_hours	| closing_hours	| cuisine_type	|
        | Boustan		|	10:00		|	18:00		|	Lebanese	|
        | Subway		|	08:00		|	23:00		|	Sandwiches	|
        
    Scenario Outline: Existing Restaurant (Normal Flow)
        When The User Tom requests the details for "<restaurant>"
        Then A restaurant information containing "<restaurant>", "opening_hours", "<closing_hours>" and "<cuisine_type>" is generated

		| restaurant	| opening_hours	| closing_hours	| cuisine_type	|
        | Boustan		|	10:00		|	18:00		|	Lebanese	|
        | Subway		|	08:00		|	23:00		|	Sandwiches	|
        
    
    Scenario Outline: Non-existing Restaurant (Error Flow)
    	When The User Tom requests for a restaurant named "<nonexisting_restaurant>"
        Then A "Non-Existing Restaurant!" message is issued
        
		| nonexisting_restaurant	|
        | Cafe Arabica				|
        | Damas						|