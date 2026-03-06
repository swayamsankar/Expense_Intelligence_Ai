import React from 'react';
import './CategoryBreakdown.css';

const mockCategories = [
  { name: 'Food & Dining', amount: 520.10, percentage: 33.6, color: '#f5a623' },
  { name: 'Transport', amount: 310.50, percentage: 20.0, color: '#4a90e2' },
  { name: 'Entertainment', amount: 190.75, percentage: 12.3, color: '#9b59b6' },
  { name: 'Utilities', amount: 150.00, percentage: 9.7, color: '#27ae60' },
];

export default function CategoryBreakdown({ categories = [] }) {
  const displayCategories = categories.length > 0 ? categories : mockCategories;

  return (
    <div className="category-breakdown card">
      <h2>Categories</h2>

      <div className="categories-list">
        {displayCategories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <div className="category-icon" style={{ color: category.color }}>
                {index === 0 && '🍔'}
                {index === 1 && '🚗'}
                {index === 2 && '🎬'}
                {index === 3 && '💡'}
              </div>
              <div className="category-details">
                <div className="category-name">{category.name}</div>
                <div className="category-bar">
                  <div
                    className="category-progress"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="category-amount">${category.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
