import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import ChartContainer from './components/ChartContainer';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    let warningText;
    if (navigator.onLine) {
      warningText = "";
    } else {
      warningText = "You are currently offline. Some data may not be up to date.";
    }
    setWarningAlert(warningText);

    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "" || currentCity === "See all cities"
    ? allEvents
    : allEvents.filter(event => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <h1>Eventory</h1>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div className="header">
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
        <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      </div>
      <ChartContainer events={events} allLocations={allLocations} />
      <EventList events={events} />
    </div>
  );
}

export default App;