import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SpendingChart.css';

const data = [
  { month: 'Jan', total: 800 },
  { month: 'Feb', total: 1200 },
  { month: 'Mar', total: 950 },
  { month: 'Apr', total: 1100 },
  { month: 'May', total: 1300 },
  { month: 'Jun', total: 1550.25 },
];

export default function SpendingChart() {
  return (
    <div className="spending-chart card">
      <h2>Spending Trends</h2>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: 'var(--radius-md)',
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#1a9b8e" 
              dot={{ fill: '#1a9b8e', r: 4 }}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
