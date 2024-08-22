Feature: Show and hide event details
  Scenario: An event element is collapsed by default
    Given the user hasn't clicked on the event element
    When the user views the list of events
    Then the event element should be collapsed by default

  Scenario: User can expand an event to see its details
    Given the user hasn't clicked on the event element
    When the user clicks on the event element
    Then the event element should expand to show the event details
    And the show details button should change to hide details

  Scenario: User can collapse an event to hide its details
    Given the user has clicked on the event element
    And the event element is expanded to show the event details
    When the user clicks on the hide details button
    Then the event element should collapse to hide the event details
    And the hide details button should change to show details
