import NumberOfEvents from "../components/NumberOfEvents";
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import userEvent from "@testing-library/user-event";
import { useState } from 'react';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    const Wrapper = () => {
      const [currentNOE, setCurrentNOE] = useState(32);
      return <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={() => { }} />;
    };
    NumberOfEventsComponent = render(<Wrapper />);
  });

  test('renders textbox', () => {
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextbox).toBeInTheDocument();
  });

  test('number of events is set to 32 by default', () => {
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextbox.value).toBe('32');
  });

  test('displays 32 events by default', async () => {
    const allEvents = await getEvents();
    const EventListComponent = render(<EventList events={allEvents} />);
    const EventListItems = EventListComponent.queryAllByRole('listitem');
    expect(EventListItems).toHaveLength(32);
  });

  test('displays 32 events when input is empty', async () => {
    const user = userEvent.setup();
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');

    await user.type(numberTextbox, '{backspace}{backspace}');
    const allEvents = await getEvents();
    const EventListComponent = render(<EventList events={allEvents} />);
    const EventListItems = EventListComponent.queryAllByRole('listitem');
    expect(EventListItems).toHaveLength(32);
  });

  test('change number of events to 10 in textbox', async () => {
    const user = userEvent.setup();
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');

    await user.type(numberTextbox, '{backspace}{backspace}10');
    expect(numberTextbox.value).toBe('10');
  });

  test('displays the correct number of events based on user input', async () => {
    const user = userEvent.setup();
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');

    await user.type(numberTextbox, '{backspace}{backspace}10');
    const allEvents = await getEvents();
    const allEventsSlice = allEvents.slice(0, 10);
    const EventListComponent = render(<EventList events={allEventsSlice} />);
    const EventListItems = EventListComponent.queryAllByRole('listitem');
    expect(EventListItems).toHaveLength(10);
  });

});