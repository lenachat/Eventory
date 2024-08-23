import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event-item">
      <h2> {event.summary} </h2>
      <p> {event.created} </p>
      <p className="event-location"> {event.location} </p>
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