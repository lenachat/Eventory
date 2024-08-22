import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/_features_/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user has opened the app', () => {
      render(<App />);
    });

    when('the user hasn\'t specified a number of events', () => {

    });

    then('the user should see a list of 32 events', async () => {
      const EventListItems = await screen.findAllByRole('listitem');
      expect(EventListItems).toHaveLength(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the user has opened the app', () => {
      render(<App />);
    });

    when('the user specifies the number of events they want to see', async () => {
      const numberTextbox = screen.getByPlaceholderText('Enter number of events');
      await userEvent.type(numberTextbox, '{backspace}{backspace}10');
    });

    then('the user should see a list of the specified number of events', async () => {
      const EventListItems = await screen.findAllByRole('listitem');
      expect(EventListItems).toHaveLength(10);
    });
  });
});