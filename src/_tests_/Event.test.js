import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
  let mockEvent;
  beforeAll(async () => {
    const allEvents = await getEvents();
    mockEvent = allEvents[0];
  });

  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });

  test('renders event component', () => {
    const eventElement = EventComponent.getByRole('listitem');
    expect(eventElement).toHaveClass('event-item');
  });

  test('renders event title', () => {
    const eventTitle = screen.getByText(mockEvent.summary);
    expect(eventTitle).toBeInTheDocument();
  });

  test('renders event start time', () => {
    const eventStartTime = screen.getByText(mockEvent.created.slice(0, 10));
    expect(eventStartTime).toBeInTheDocument();
  });

  test('renders event location', () => {
    const eventLocation = screen.getByText(mockEvent.location);
    expect(eventLocation).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const showDetailsButton = screen.getByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });

  test('by default event details section should be hidden', () => {
    // Check that the details are not visible by default
    const eventDetails = screen.queryByText("Details");
    expect(eventDetails).not.toBeInTheDocument();

    // Ensure that the "Show Details" button is present
    const showDetailsButton = screen.getByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });

  test('shows details when "Show Details" is clicked', async () => {
    const user = userEvent.setup();
    // Click the "Show Details" button
    const showDetailsButton = screen.getByText('Show Details');
    await user.click(showDetailsButton);

    // Check that the details are visible
    const eventDetails = screen.queryByText("Details");
    expect(eventDetails).toBeInTheDocument();

    // Verify the button text is now "Hide Details"
    const hideDetailsButton = screen.getByText('Hide Details');
    expect(hideDetailsButton).toBeInTheDocument();
  });

  test('hides details when "Hide Details" is clicked', async () => {
    const user = userEvent.setup();
    // Click the "Show Details" button
    const showDetailsButton = screen.getByText('Show Details');
    await user.click(showDetailsButton);

    const hideDetailsButton = screen.queryByText('Hide Details');
    expect(hideDetailsButton).toBeInTheDocument();

    await user.click(hideDetailsButton);
    // Check that the details are not visible
    const eventDetails = screen.queryByText("Details");
    expect(eventDetails).not.toBeInTheDocument();

    // Verify the button text is now "Show Details"
    const showDetailsButtonAfterHide = screen.getByText('Show Details');
    expect(showDetailsButtonAfterHide).toBeInTheDocument();
  });

});