import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/_features_/showHideEventDetails.feature');

defineFeature(feature, test => {
  let mockEvent;

  beforeAll(async () => {
    const allEvents = await getEvents();
    mockEvent = allEvents[0];
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn\'t clicked on the event element', () => {
      render(<Event event={mockEvent} />)
    });

    when('the user views the list of events', () => {
    });

    then('the event element should be collapsed by default', () => {
      const eventDetails = screen.queryByText("Details");
      expect(eventDetails).not.toBeInTheDocument();

      const showDetailsButton = screen.getByText('Show Details');
      expect(showDetailsButton).toBeInTheDocument();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then, and }) => {
    given('the user hasn\'t clicked on the event element', () => {
      render(<Event event={mockEvent} />);
    });

    when('the user clicks on the event element', async () => {
      const showDetailsButton = screen.getByText('Show Details');
      await userEvent.click(showDetailsButton);
    });

    then('the event element should expand to show the event details', () => {
      const eventDetails = screen.queryByText("Details");
      expect(eventDetails).toBeInTheDocument();
    });

    and('the show details button should change to hide details', () => {
      const hideDetailsButton = screen.getByText('Hide Details');
      expect(hideDetailsButton).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
    given('the user has clicked on the event element', async () => {
      render(<Event event={mockEvent} />);
      const showDetailsButton = screen.getByText('Show Details');
      await userEvent.click(showDetailsButton);
    });

    and('the event element is expanded to show the event details', () => {
      const eventDetails = screen.queryByText("Details");
      expect(eventDetails).toBeInTheDocument();
    });

    when('the user clicks on the hide details button', async () => {
      const hideDetailsButton = screen.getByText('Hide Details');
      await userEvent.click(hideDetailsButton);
    });

    then('the event element should collapse to hide the event details', () => {
      const eventDetails = screen.queryByText("Details");
      expect(eventDetails).not.toBeInTheDocument();
    });

    and('the hide details button should change to show details', () => {
      const showDetailsButton = screen.getByText('Show Details');
      expect(showDetailsButton).toBeInTheDocument();
    });
  });


});