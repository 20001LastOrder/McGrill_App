Feature: Update order status
  
  As a restaurant owner of the McGrill System, I want to be able to update the order status so that  I can notify the customer about the process

  Background: 
    Given Joe Rangel is logged in as a restaurant owner
    Given Joe Rangel owns a restaurant Joe1
    Given Joe1 has the following orders
      | orderId | status  |
      |    1111 | pending |

  Scenario Outline: Change order status (Normal Flow)
    Given <orderId> is in status <status>
    When Joe Rangel request to change the status of the order
    Then the status of <orderId> changes to <newStatus>

    Examples: 
      | orderId | status      | newStatus   |
      |    1111 | pending     | confirmed   |
      |    1111 | confirmed   | in progress |
      |    1111 | in progress | ready       |
      |    1111 | ready       | complete    |

  Scenario: Cancel an order (Alternative Flow)
  	Given order 1111 is not complete
  	When Joe Rangel request to change the status of the order
  	Then the status of order '1111' changes to 'cancelled'

 	Scenario: Cancel a finished order (Error Flow)
  	Given order 1111 is complete
  	When Joe Rangel request to change the status of the order
  	Then A "order is already complete" Message is issued
  	
  Scenario: Change order status without login (Error Flow)
		Given NonUser is not logged into the system
        When NonUser requests change the status of order 1111
        Then A "Please Login" Message is issued
		
  	