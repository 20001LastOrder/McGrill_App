Feature: View all orders in queue
  
  As a restaurant owner, I want to be able to view all the unfinished order of my restaurants, so that I can prepare food for customers accordingly

  Background: 
    Given George Cullen is logged in as a restaurant owner and owns a restaurant George1
    Given George1 has the following orders
      | orderId | status      |
      |    1111 | pending     |
      |    1112 | confirmed   |
      |    1114 | in_progress |
      |    1115 | ready       |
      |    1116 | complete    |
      |    1117 | cancelled   |

  Scenario: View all orders in queue (Normal Flow)
    When George Cullen requests to view all the orders in queue
    Then the following items are returned
      | orderId |
      |    1111 |
      |    1112 |
      |    1114 |
      |    1115 |
      
  Scenario: View cart without login (Error Flow)
        Given NonUser is not logged into the system for view all orders
        When NonUser requests requests to view all the orders in queue for view all orders
        Then A "Please Login" Message is issued for view all orders
		
