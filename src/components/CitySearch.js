import { useEffect, useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "Can not find city you are searching for. Please try another city.";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };


  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    if (value === "See all Cities") {
      setCurrentCity(""); // Use an empty string to signify all cities
    } else {
      setCurrentCity(value); // Set the selected city
    }
    setQuery(value);
    setShowSuggestions(false);
    setInfoAlert("");
  };

  return (
    <div id="city-search">
      <p className="city-search-text">Choose your nearest city</p>
      <input
        type="text"
        className="city"
        placeholder="Search for City"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">

          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}

          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all Cities</b>
          </li>

        </ul> : null
      }
    </div>
  )
}

export default CitySearch;