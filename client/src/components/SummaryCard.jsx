import React from 'react';
import './SummaryCard.css';

export default function SummaryCard({ title, amount, change, icon, color }) {
  const isPositive = change >= 0;

  return (
    <div className={`summary-card card ${color}`}>
      <div className="card-header">
        <h3>{title}</h3>
        {icon && <div className="card-icon">{icon}</div>}
      </div>
      
      <div className="card-amount">
        {amount}
      </div>

      {change !== undefined && (
        <div className={`card-change ${isPositive ? 'positive' : 'negative'}`}>
          <span className="change-icon">{isPositive ? '↑' : '↓'}</span>
          <span className="change-text">
            {isPositive ? '+' : ''}{change}% from last month
          </span>
        </div>
      )}
    </div>
  );
}
