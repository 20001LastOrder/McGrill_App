Feature: Update order status
  
  As a restaurant owner of the McGrill System, I want to be able to update the order status so that  I can notify the customer about the process

  Background: 
    Given Joe Rangel is logged in as a restaurant owner and owns a restaurant Joe1
    Given Joe1 has the following orders
      | orderId | status  |
      |    1111 | pending |

  Scenario Outline: Change order status (Normal Flow)
    When Joe Rangel request to change the status of the order <orderId> to <newStatus>
    Then the status of <orderId> changes to <newStatus>

    Examples: 
      | orderId | newStatus   |
      |    1111 | confirmed   |
      |    1111 | in_progress |
      |    1111 | ready       |
      |    1111 | complete    |

  Scenario Outline: Cancel an order (Alternative Flow)
    Given order 1111 is not complete
    When Joe Rangel request to change the status of the order <orderId> to <newStatus>
    Then the status of <orderId> changes to <newStatus>
    Examples: 
      | orderId | newStatus   |
      |    1111 | cancelled   |

  Scenario: Cancel a finished order (Error Flow)
    Given order 1111 is complete
    When Joe Rangel request to change the status of the order 1111 to 'cancelled'
    Then A "order is already complete" Message is issued

  Scenario: Change order status without login (Error Flow)
    Given NonUser is not logged into the system
    When NonUser requests change the status of order 1111
    Then A "Please Login" Message is issued
