const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {

  const handleInputChanged = (event) => {
    const value = event.target.value;

    let errorText;
    if (value < 0 || isNaN(value)) {
      errorText = "Only positive numbers are allowed.";
    } else if (value > 32) {
      errorText = "Maximum number of events is 32.";
    } else {
      errorText = "";
      setCurrentNOE(Number(value));
    }
    setErrorAlert(errorText);
  }

  return (
    <div id="number-of-events">
      <p className="noe-text">Number of Events</p>
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