Feature: Google Search

Scenario: Searching Google
    Given I open Google's Search Page
    Then the title is "Google"
    And the Google Search form exists