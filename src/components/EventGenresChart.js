import { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';


const EventGenresChart = ({ events, allLocations }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const Colors = ['#0740a9', '#00a7c4', '#ffe70f', '#dd1212', '#9c23f9'];

  useEffect(() => {
    setData(getData());
  }, [`${events}`, `${allLocations}`]);

  const getData = () => {

    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '');
    };

    let data = genres.map((genre) => {
      const normalizedGenre = normalizeText(genre);
      const value = events.filter(({ summary }) =>
        normalizeText(summary).includes(normalizedGenre)
      ).length;
      return { name: genre , value };
    });

    data = data.filter((data) => data.value > 0);
    return data;
  };

  // const getData = () => {
  //   let data = genres.map((genre) => {
  //     const name = genre;
  //     const value = events.filter(({ summary }) =>
  //       summary.split(' ').includes(genre)
  //     ).length;
  //     return { name, value };
  //   });
  //   data = data.filter((data) => data.value > 0);
  //   return data;
  // };

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
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

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
          label={renderCustomizedLabel}>

          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;