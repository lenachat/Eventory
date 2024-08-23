const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {

  const handleInputChanged = (event) => {
    const value = event.target.value;
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