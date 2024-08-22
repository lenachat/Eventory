Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given the user has opened the app
    When the user hasn't specified a number of events
    Then the user should see a list of 32 events

  Scenario: User can change the number of events they want to see
    Given the user has opened the app
    When the user specifies the number of events they want to see
    Then the user should see a list of the specified number of events