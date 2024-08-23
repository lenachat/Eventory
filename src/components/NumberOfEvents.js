import { useState } from "react";
import { useEffect } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  //const [numberOfEvents, setNumberOfEvents] = useState(currentNOE);

  // useEffect(() => {
  //   setCurrentNOE(currentNOE);
  // }, [currentNOE]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    //setNumberOfEvents(value);
    setCurrentNOE(Number(value));
  }

  return (
    <div id="number-of-events">
      <p>Number of events:</p>
      <input
        type="text"
        className="number-of-events"
        placeholder="Enter number of events"
        value={currentNOE}
        onChange={handleInputChanged}
      />
    </div>
  )
};

export default NumberOfEvents;