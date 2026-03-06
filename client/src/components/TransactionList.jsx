import React from 'react';
import './TransactionList.css';

const getCategoryIcon = (category) => {
  const icons = {
    'Food & Dining': '🍔',
    Transport: '🚗',
    Entertainment: '🎬',
    Utilities: '💡',
    Shopping: '🛍️',
    Health: '🏥',
    Education: '📚',
    Other: '📦',
  };
  return icons[category] || '📦';
};

const getCategoryColor = (category) => {
  const colors = {
    'Food & Dining': '#f5a623',
    Transport: '#4a90e2',
    Entertainment: '#9b59b6',
    Utilities: '#27ae60',
    Shopping: '#3498db',
    Health: '#e74c3c',
    Education: '#2ecc71',
    Other: '#95a5a6',
  };
  return colors[category] || '#95a5a6';
};

export default function TransactionList({ transactions = [] }) {
  const mockTransactions = [
    {
      id: 1,
      merchant: 'Starbucks',
      category: 'Food & Dining',
      amount: 12.50,
      date: '10/25/24',
    },
    {
      id: 2,
      merchant: 'Amazon',
      category: 'Shopping',
      amount: 89.99,
      date: '10/24/24',
    },
    {
      id: 3,
      merchant: 'Amazon',
      category: 'Groceries',
      amount: 12.50,
      date: '10/24/24',
    },
    {
      id: 4,
      merchant: 'Starbucks',
      category: 'Food & Dining',
      amount: 15.00,
      date: '10/20/24',
    },
  ];

  const displayTransactions = transactions.length > 0 ? transactions : mockTransactions;

  return (
    <div className="transaction-list card">
      <div className="list-header">
        <h2>Recent Transactions</h2>
        <button className="btn-secondary">View All</button>
      </div>

      <div className="transactions-table">
        <div className="table-header">
          <div className="col-merchant">Merchant</div>
          <div className="col-category">Auto-categorized</div>
          <div className="col-amount">Amount</div>
        </div>

        <div className="table-body">
          {displayTransactions.map((transaction) => (
            <div key={transaction.id} className="table-row">
              <div className="col-merchant">
                <div className="merchant-info">
                  <div
                    className="merchant-avatar"
                    style={{
                      backgroundColor: getCategoryColor(transaction.category),
                    }}
                  >
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div>
                    <div className="merchant-name">{transaction.merchant}</div>
                    <div className="transaction-date">{transaction.date}</div>
                  </div>
                </div>
              </div>
              <div className="col-category">
                <span className="category-badge">{transaction.category}</span>
              </div>
              <div className="col-amount">
                <span className="amount">-${transaction.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
