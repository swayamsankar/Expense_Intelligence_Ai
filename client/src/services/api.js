import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Expense endpoints
export const expenseAPI = {
  addExpense: (data) => api.post('/expenses', data),
  getExpenses: (userId, params) => api.get(`/expenses/${userId}`, { params }),
  updateExpense: (id, data) => api.put(`/expenses/${id}`, data),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  getCategoryBreakdown: (userId, params) => 
    api.get(`/expenses/${userId}/categories`, { params }),
};

// Analytics endpoints
export const analyticsAPI = {
  getSpendingTrends: (userId, params) => 
    api.get(`/analytics/${userId}/trends`, { params }),
  getMonthlySummary: (userId, params) => 
    api.get(`/analytics/${userId}/summary`, { params }),
  getFinancialInsights: (userId, params) => 
    api.get(`/analytics/${userId}/insights`, { params }),
  getBudgetRisk: (userId, params) => 
    api.get(`/analytics/${userId}/risk`, { params }),
  getRecentTransactions: (userId, params) => 
    api.get(`/analytics/${userId}/recent`, { params }),
};

export default api;
