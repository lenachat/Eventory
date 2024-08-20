import { useState } from "react";

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
  }


  return (
    <div id="number-of-events">
      <input
        type="text"
        className="number-of-events"
        placeholder="Enter number of events"
        value={numberOfEvents}
        onChange={handleInputChanged}
      />
    </div>
  )
};

export default NumberOfEvents;