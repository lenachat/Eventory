import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';


const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const Colors = {
    'React': '#0740a9',
    'JavaScript': '#00a7c4',
    'Node': '#ffe70f',
    'jQuery': '#dd1212',
    'Angular': '#9c23f9'
  };

  useEffect(() => {
    setData(getData());
  }, [events]);

  const getData = () => {
    // Function to normalize text (convert to lowercase and remove special characters)
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ''); // Remove special characters
    };

    let data = genres.map((genre) => {
      const normalizedGenre = normalizeText(genre);

      const filteredEvents = events.filter(event => {
        const normalizedSummary = normalizeText(event.summary);
        return normalizedSummary.includes(normalizedGenre);
      });

      return { name: genre, value: filteredEvents.length };
    });

    data = data.filter((data) => data.value > 0); // Remove genres with 0 occurrences
    return data;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const renderLegendText = (value) => <span style={{ color: 'white' }}>{value}</span>;

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          fill="rgb(255, 182, 103)"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={Colors[entry.name]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={renderLegendText} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;