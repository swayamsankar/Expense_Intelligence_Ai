import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import SpendingChart from '../components/SpendingChart';
import CategoryBreakdown from '../components/CategoryBreakdown';
import TransactionList from '../components/TransactionList';
import RiskScoreCard from '../components/RiskScoreCard';
import AddExpenseForm from '../components/AddExpenseForm';
import '../styles/Dashboard.css';

// Mock user ID for now
const MOCK_USER_ID = '507f1f77bcf86cd799439011';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulate data loading
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simulated data - in production, this would call the API
      setSummary({
        totalSpent: 1550.25,
        lastMonthTotal: 1236.48,
        changePercentage: 12.5,
        transactionCount: 12,
      });

      setRiskData({
        riskScore: 45,
        riskLevel: 'medium',
        assessment: 'You are on track with your budget',
      });

      setExpenses([
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
      ]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      // In production, this would call the API
      console.log('Adding expense:', formData);
      setShowForm(false);
      // Reload data
      await loadDashboardData();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Monthly Overview</h1>
            <p className="breadcrumb">Dashboard / Expenses / Overview</p>
          </div>
          <button className="btn-add-transaction" onClick={() => setShowForm(!showForm)}>
            Add Transaction
          </button>
        </div>

        {showForm && <AddExpenseForm onSubmit={handleAddExpense} />}

        {/* Summary Section */}
        <section className="summary-section">
          {summary && (
            <>
              <SummaryCard
                title="Total Spent"
                amount={`$${summary.totalSpent.toFixed(2)}`}
                change={summary.changePercentage}
                color="teal"
              />
              <SummaryCard
                title="Total Income"
                amount="$4,200.00"
                change={1.2}
                color="green"
              />
              <SummaryCard
                title="Savings Goal"
                amount="$850 / $1,000"
                color="orange"
              />
            </>
          )}
        </section>

        {/* Charts Section */}
        <section className="charts-section">
          <div className="chart-col-1">
            <SpendingChart />

            <div className="grid-2">
              <CategoryBreakdown />
              {riskData && <RiskScoreCard riskScore={riskData.riskScore} />}
            </div>
          </div>

          <div className="chart-col-2">
            <div className="right-panel">
              <div className="spending-trends-card card">
                <h2>Spending Trends</h2>
                <div className="spending-items">
                  <div className="spending-item">
                    <div className="spending-icon" style={{ color: '#f5a623' }}>
                      🍔
                    </div>
                    <div className="spending-content">
                      <div className="spending-name">Starbucks</div>
                      <div className="spending-category">Food & Drink</div>
                    </div>
                    <div className="spending-amount">$1,550.25</div>
                  </div>

                  <div className="spending-item">
                    <div className="spending-icon" style={{ color: '#da4b15' }}>
                      🏠
                    </div>
                    <div className="spending-content">
                      <div className="spending-name">Rent</div>
                      <div className="spending-category">Housing</div>
                    </div>
                    <div className="spending-amount">$100.00</div>
                  </div>

                  <div className="spending-item">
                    <div className="spending-icon" style={{ color: '#4a90e2' }}>
                      🚗
                    </div>
                    <div className="spending-content">
                      <div className="spending-name">Transport</div>
                    </div>
                    <div className="spending-amount">$310.50</div>
                  </div>

                  <div className="spending-item">
                    <div className="spending-icon" style={{ color: '#9b59b6' }}>
                      🎬
                    </div>
                    <div className="spending-content">
                      <div className="spending-name">Gallton</div>
                    </div>
                    <div className="spending-amount">$50.00</div>
                  </div>

                  <div className="spending-item">
                    <div className="spending-icon" style={{ color: '#27ae60' }}>
                      💡
                    </div>
                    <div className="spending-content">
                      <div className="spending-name">Utilities</div>
                    </div>
                    <div className="spending-amount">$150.00</div>
                  </div>
                </div>
              </div>

              <div className="budget-progress card">
                <h2>Budget Progress</h2>
                <div className="budget-items">
                  <div className="budget-item">
                    <div className="budget-info">
                      <span className="budget-name">Groceries</span>
                      <span className="budget-percent">75%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '75%', backgroundColor: '#1a9b8e' }}></div>
                    </div>
                  </div>

                  <div className="budget-item">
                    <div className="budget-info">
                      <span className="budget-name">Rent</span>
                      <span className="budget-percent">100%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '100%', backgroundColor: '#1a9b8e' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Section */}
        <section className="transaction-section">
          <TransactionList transactions={expenses} />
        </section>
      </main>
    </>
  );
}
