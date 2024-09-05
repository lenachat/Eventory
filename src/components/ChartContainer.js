import React from "react";
import { useState } from "react";
import CityEventsChart from "./CityEventsChart";
import EventGenresChart from "./EventGenresChart";

const ChartContainer = ({ events, allLocations }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="accordion"
      onClick={toggleCollapse}>
      <p> {isCollapsed ? 'Show' : 'Hide'} Event Trends {isCollapsed ? '↓' : '↑'} </p>
      <div style={{ display: isCollapsed ? 'none' : 'block' }}>
        <div className="chart-container">
          <EventGenresChart events={events} />
          <CityEventsChart events={events} allLocations={allLocations} />
        </div>
      </div>
    </div>
  );
}

export default ChartContainer;