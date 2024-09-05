import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [events, allLocations]);

  const getData = () => {
    const data = allLocations.map(location => {
      const cityCount = events.filter(event => event.location === location).length;
      const city = location.split(/, | - /)[0];
      return { city, cityCount };
    });
    console.log("City Events Data:", data);
    return data;
  }

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 30,
          right: 20,
          bottom: 70,
          left: -30,
        }}
      >
        <CartesianGrid stroke="white" />
        <XAxis type="category" dataKey="city" name="City" angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 16, fill: 'white' }} stroke="#white" />
        <YAxis type="number" dataKey="cityCount" name="Number of events" stroke="#white"
          tick={{ fill: 'white' }} allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Number of Events" data={data} fill="#AF19FF" shape="circle" />
      </ScatterChart>
    </ResponsiveContainer>
  );

};

export default CityEventsChart;