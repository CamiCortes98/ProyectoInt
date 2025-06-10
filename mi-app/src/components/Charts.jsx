import React from 'react';
import {
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export function Charts({ items }) {

  const barData = Object.entries(
    items.reduce((a, p) => {
      const cat = p.category ?? 'Sin categoría';
      a[cat] = (a[cat] || 0) + 1;
      return a;
    }, {})
  ).map(([name, value]) => ({ name, value }));


  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const lineData = months.map((m, i) => {
    const sliceCount = Math.floor(items.length * ((i + 1) / months.length));
    const subset = items.slice(0, sliceCount);
    const avg = subset.reduce((s, p) => s + (p.price ?? 0), 0) / (subset.length || 1);
    return { month: m, avg: parseFloat(avg.toFixed(2)) };
  });


  const pieData = [
    { name: 'Stock ≤50', value: items.filter(p => (p.stock ?? 0) <= 50).length },
    { name: 'Stock >50', value: items.filter(p => (p.stock ?? 0) > 50).length },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-3 mb-6">
      <BarChart width={300} height={250} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" />
      </BarChart>

      <LineChart width={300} height={250} data={lineData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="avg" />
      </LineChart>

      <PieChart width={300} height={250}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {pieData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Charts;