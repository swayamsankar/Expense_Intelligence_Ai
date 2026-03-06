import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../components/Header';
import '../styles/Analytics.css';

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics/summary');
        const data = await response.json();
        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Use mock data for demo
        setAnalyticsData(getMockAnalytics());
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getMockAnalytics = () => ({
    monthlyTrends: [
      { month: 'Jan', spent: 1200, budget: 2000 },
      { month: 'Feb', spent: 1450, budget: 2000 },
      { month: 'Mar', spent: 1100, budget: 2000 },
      { month: 'Apr', spent: 1550, budget: 2000 },
      { month: 'May', spent: 1300, budget: 2000 },
      { month: 'Jun', spent: 1400, budget: 2000 },
    ],
    categoryData: [
      { name: 'Food & Dining', value: 520, color: '#FF9F43' },
      { name: 'Transport', value: 310, color: '#54A0FF' },
      { name: 'Entertainment', value: 190, color: '#A29BFE' },
      { name: 'Utilities', value: 150, color: '#00B894' },
      { name: 'Shopping', value: 290, color: '#FD79A8' },
    ],
    weeklySpending: [
      { week: 'Week 1', amount: 280 },
      { week: 'Week 2', amount: 320 },
      { week: 'Week 3', amount: 250 },
      { week: 'Week 4', amount: 320 },
    ],
  });

  const handleGoToMain = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <Header />
        <main className="analytics-container">
          <p>Loading analytics...</p>
        </main>
      </div>
    );
  }

  const data = analyticsData || getMockAnalytics();

  return (
    <div className="analytics-page">
      <Header />

      <main className="analytics-container">
        <div className="analytics-header" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h1>Financial Analytics</h1>
            <p>Track insights, trends, and performance of your expenses in real-time.</p>
          </div>
          <button
            className="go-main-btn"
            onClick={handleGoToMain}
            style={{
              alignSelf: 'flex-end',
              background: 'var(--primary, #1a9b8e)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(26,155,142,0.10)'
            }}
          >
            Go to Main Page
          </button>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card gradient-card">
            <div className="card-header">
              <h2>Monthly Spending Trends</h2>
              <span className="card-badge">6 Months</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.monthlyTrends}>
                  <defs>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a9b8e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1a9b8e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#f8fbff', border: '1px solid #e0e7ff', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="spent" stroke="#1a9b8e" fillOpacity={1} fill="url(#colorSpent)" name="Spent" />
                  <Area type="monotone" dataKey="budget" stroke="#cbd5e1" strokeDasharray="5 5" fill="none" name="Budget" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="analytics-card glass-card">
            <div className="card-header">
              <h2>Category Breakdown</h2>
              <span className="card-badge purple">By Spending</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="analytics-card glow-card">
            <div className="card-header">
              <h2>Weekly Breakdown</h2>
              <span className="card-badge green">This Month</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.weeklySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#f8fbff', border: '1px solid #e0e7ff', borderRadius: '8px' }} />
                  <Bar dataKey="amount" fill="#1a9b8e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="analytics-insights">
          <div className="insight-card">
            <div className="insight-icon">📊</div>
            <div className="insight-content">
              <h3>Average Monthly Spending</h3>
              <p className="insight-value">$1,334</p>
              <p className="insight-text">Your consistent spending across categories</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h3>Budget Status</h3>
              <p className="insight-value">66.7%</p>
              <p className="insight-text">You're on track with your monthly budget</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <div className="insight-content">
              <h3>Top Category</h3>
              <p className="insight-value">Food & Dining</p>
              <p className="insight-text">Your highest spending category this month</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h3>AI Recommendation</h3>
              <p className="insight-value">Save $150</p>
              <p className="insight-text">By reducing dining expenses, you could save more</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;
