import { useState } from "react";
import { useEffect } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(currentNOE);

  useEffect(() => {
    setNumberOfEvents(currentNOE);
  }, [currentNOE]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    setCurrentNOE(Number(value));
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