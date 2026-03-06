import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/Expenses.css';

// Utils for category
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

function Expenses({ onNavigate }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: 'All',
    month: new Date().toISOString().slice(0, 7),
    search: '',
  });

  const [sortBy, setSortBy] = useState('date-desc');
  const [view, setView] = useState('list');

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [transactions, filters, sortBy]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      const data = await response.json();
      setTransactions(data.expenses || getMockTransactions());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions(getMockTransactions());
      setLoading(false);
    }
  };

  const getMockTransactions = () => [
    {
      id: 1,
      merchant: 'Starbucks',
      category: 'Food & Dining',
      amount: 12.50,
      date: '2024-10-25',
      description: 'Morning coffee',
    },
    {
      id: 2,
      merchant: 'Amazon',
      category: 'Shopping',
      amount: 89.99,
      date: '2024-10-24',
      description: 'Electronics and accessories',
    },
    {
      id: 3,
      merchant: 'Uber',
      category: 'Transport',
      amount: 32.15,
      date: '2024-10-24',
      description: 'Ride to office',
    },
    {
      id: 4,
      merchant: 'Netflix',
      category: 'Entertainment',
      amount: 15.99,
      date: '2024-10-23',
      description: 'Monthly subscription',
    },
    {
      id: 5,
      merchant: 'Whole Foods',
      category: 'Food & Dining',
      amount: 67.43,
      date: '2024-10-22',
      description: 'Grocery shopping',
    },
    {
      id: 6,
      merchant: 'Electric Company',
      category: 'Utilities',
      amount: 120.0,
      date: '2024-10-20',
      description: 'Monthly electricity bill',
    },
    {
      id: 7,
      merchant: 'Gym Membership',
      category: 'Health',
      amount: 50.0,
      date: '2024-10-20',
      description: 'Monthly fitness',
    },
    {
      id: 8,
      merchant: 'Audible',
      category: 'Education',
      amount: 14.95,
      date: '2024-10-19',
      description: 'Audiobook subscription',
    },
  ];

  const applyFilters = () => {
    let result = [...transactions];

    // Filter by category
    if (filters.category !== 'All') {
      result = result.filter((t) => t.category === filters.category);
    }

    // Filter by month
    if (filters.month) {
      result = result.filter((t) => t.date.startsWith(filters.month));
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.merchant.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === 'date-desc') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'date-asc') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'amount-desc') {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'amount-asc') {
      result.sort((a, b) => a.amount - b.amount);
    }

    setFilteredTransactions(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await fetch(`http://localhost:5000/api/expenses/${id}`, {
          method: 'DELETE',
        });
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  const categories = [
    'All',
    'Food & Dining',
    'Transport',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Health',
    'Education',
    'Other',
  ];

  const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgSpent =
    filteredTransactions.length > 0
      ? (totalSpent / filteredTransactions.length).toFixed(2)
      : 0;

  // Responsive button styles
  const goMainBtnStyle = {
    display: 'inline-block',
    padding: '10px 18px',
    margin: '0 0 18px 0',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '6px',
    border: 'none',
    background: 'var(--bg-primary, #3498db)',
    color: 'var(--text-primary, #fff)',
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    transition: 'background 0.2s',
  };

  const goMainBtnHoverStyle = {
    background: 'var(--bg-secondary, #286fa1)',
  };

  // Responsive with media queries: use a class
  // Add this CSS to Expenses.css (or another file) for more graceful scaling:
  // .go-main-btn { ...above styles... }
  // @media (max-width: 600px) { .go-main-btn { font-size: 15px; padding: 7px 10px; } }

  // Handler for going to main page (header)
  const handleGoMain = (e) => {
    e.preventDefault();
    // By convention, main page is under header or "/"
    if (onNavigate) {
      onNavigate('main');
    } else {
      // fallback for router-based setups
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="expenses-page">
        <Header onNavigate={onNavigate} currentPage="expenses" />
        <main className="expenses-container">
          <button
            className="go-main-btn"
            style={goMainBtnStyle}
            onClick={handleGoMain}
            onMouseOver={e=>Object.assign(e.target.style, goMainBtnHoverStyle)}
            onMouseOut={e=>Object.assign(e.target.style, goMainBtnStyle)}
          >
            Go to Main Page
          </button>
          <p>Loading expenses...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="expenses-page">
      <Header onNavigate={onNavigate} currentPage="expenses" />

      <main className="expenses-container">
        {/* Go to Main Page Button */}
        <button
          className="go-main-btn"
          style={goMainBtnStyle}
          onClick={handleGoMain}
          onMouseOver={e=>Object.assign(e.target.style, goMainBtnHoverStyle)}
          onMouseOut={e=>Object.assign(e.target.style, goMainBtnStyle)}
        >
          Go to Main Page
        </button>
        {/* Page Header */}
        <div className="expenses-header">
          <div>
            <h1>Expenses</h1>
            <p>Manage and track all your transactions</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="expenses-stats">
          <div className="stat-card">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">${totalSpent.toFixed(2)}</div>
            <div className="stat-count">{filteredTransactions.length} transactions</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average Transaction</div>
            <div className="stat-value">${avgSpent}</div>
            <div className="stat-count">Per transaction</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Highest Expense</div>
            <div className="stat-value">
              $
              {filteredTransactions.length > 0
                ? Math.max(...filteredTransactions.map((t) => t.amount)).toFixed(2)
                : '0.00'}
            </div>
            <div className="stat-count">This period</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="expenses-controls">
          <div className="controls-left">
            {/* Category Filter */}
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div className="filter-group">
              <label htmlFor="month-filter">Month</label>
              <input
                id="month-filter"
                type="month"
                value={filters.month}
                onChange={(e) => handleFilterChange('month', e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Search */}
            <div className="filter-group">
              <label htmlFor="search-filter">Search</label>
              <input
                id="search-filter"
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          <div className="controls-right">
            {/* Sort */}
            <div className="filter-group">
              <label htmlFor="sort-select">Sort By</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="view-toggle">
              <button
                className={`view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                title="List view"
              >
                ≡
              </button>
              <button
                className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                ⊞
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className={`transactions-view ${view}-view`}>
          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <div className="no-transactions-icon">📭</div>
              <h3>No transactions found</h3>
              <p>Try adjusting your filters or add a new expense</p>
            </div>
          ) : (
            <div className={`transactions-${view}`}>
              {view === 'list' ? (
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Merchant</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="transaction-row">
                        <td className="date-cell">{transaction.date}</td>
                        <td className="merchant-cell">
                          <span className="category-icon">
                            {getCategoryIcon(transaction.category)}
                          </span>
                          {transaction.merchant}
                        </td>
                        <td className="category-cell">
                          <span
                            className="category-badge"
                            style={{ backgroundColor: getCategoryColor(transaction.category) }}
                          >
                            {transaction.category}
                          </span>
                        </td>
                        <td className="description-cell">{transaction.description}</td>
                        <td className="amount-cell">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="action-cell">
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            title="Delete transaction"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="transactions-grid">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-card">
                      <div className="card-header">
                        <div
                          className="card-icon"
                          style={{ color: getCategoryColor(transaction.category) }}
                        >
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteTransaction(transaction.id)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="card-body">
                        <h4>{transaction.merchant}</h4>
                        <p className="card-description">{transaction.description}</p>
                        <div className="card-category">
                          <span
                            className="category-badge"
                            style={{
                              backgroundColor: getCategoryColor(transaction.category),
                            }}
                          >
                            {transaction.category}
                          </span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <span className="card-date">{transaction.date}</span>
                        <span className="card-amount">
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Expenses;
