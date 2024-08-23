import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event-item">
      <div className="date-location-container">
        <p>{event.created.slice(0, 10)}</p>
        <p className="event-location">{event.location}</p>
      </div>
      <h2 className="event-title">{event.summary}</h2>
      <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails ?
        <div className="event-details">
          <h3>Details</h3>
          <p> {event.description} </p>
        </div>
        : null
      }
    </li>
  );
}

export default Event;