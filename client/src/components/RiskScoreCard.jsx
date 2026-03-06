import React from 'react';
import './RiskScoreCard.css';

export default function RiskScoreCard({ riskScore = 45, riskLevel = 'medium' }) {
  const getColorClass = () => {
    if (riskScore >= 80) return 'high';
    if (riskScore >= 50) return 'medium';
    return 'low';
  };

  const getRiskText = () => {
    if (riskScore >= 80) return 'High Risk';
    if (riskScore >= 50) return 'Medium Risk';
    return 'Low Risk';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <div className={`risk-card card ${getColorClass()}`}>
      <h3>Budget Risk</h3>
      
      <div className="risk-visual">
        <svg width="120" height="120" className="risk-circle">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="risk-indicator"
          />
        </svg>
        <div className="risk-score-text">
          <span className="score">{riskScore}%</span>
        </div>
      </div>

      <div className="risk-label">{getRiskText()}</div>
    </div>
  );
}
