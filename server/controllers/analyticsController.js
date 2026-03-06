import { Expense } from '../models/Expense.js';
import { generateFinancialInsights, predictBudgetRisk } from '../utils/aiCategorizer.js';

// Get spending trends (monthly totals)
export const getSpendingTrends = async (req, res) => {
  try {
    const { userId } = req.params;
    const { months = 6 } = req.query;

    const trends = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

      const monthExpenses = await Expense.find({
        userId,
        date: { $gte: date, $lt: nextMonth },
      });

      const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      trends.push({
        month: date.toISOString().slice(0, 7), // YYYY-MM format
        total: parseFloat(monthTotal.toFixed(2)),
        count: monthExpenses.length,
      });
    }

    res.status(200).json({
      success: true,
      trends,
    });
  } catch (error) {
    console.error('Error fetching spending trends:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get monthly summary
export const getMonthlySummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year } = req.query;

    const now = new Date();
    const currentMonth = month || now.getMonth() + 1;
    const currentYear = year || now.getFullYear();

    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);
    const lastMonthStart = new Date(currentYear, currentMonth - 2, 1);
    const lastMonthEnd = new Date(currentYear, currentMonth - 1, 0, 23, 59, 59);

    // Current month expenses
    const currentExpenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Last month expenses
    const lastMonthExpenses = await Expense.find({
      userId,
      date: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    const currentTotal = currentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const changePercentage =
      lastMonthTotal > 0
        ? (((currentTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(2)
        : 0;

    // Category breakdown
    const categoryBreakdown = {};
    currentExpenses.forEach((expense) => {
      categoryBreakdown[expense.category] =
        (categoryBreakdown[expense.category] || 0) + expense.amount;
    });

    res.status(200).json({
      success: true,
      summary: {
        currentMonth: `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
        totalSpent: parseFloat(currentTotal.toFixed(2)),
        lastMonthTotal: parseFloat(lastMonthTotal.toFixed(2)),
        changePercentage: parseFloat(changePercentage),
        transactionCount: currentExpenses.length,
        categoryBreakdown,
      },
    });
  } catch (error) {
    console.error('Error fetching monthly summary:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get financial insights
export const getFinancialInsights = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year, budget = 5000 } = req.query;

    const now = new Date();
    const currentMonth = month || now.getMonth() + 1;
    const currentYear = year || now.getFullYear();

    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const insights = await generateFinancialInsights(expenses, parseFloat(budget));

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get budget risk prediction
export const getBudgetRisk = async (req, res) => {
  try {
    const { userId } = req.params;
    const { budget = 5000, month, year } = req.query;

    const now = new Date();
    const currentMonth = month || now.getMonth() + 1;
    const currentYear = year || now.getFullYear();
    const currentDay = now.getDate();

    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const riskData = await predictBudgetRisk(expenses, parseFloat(budget), currentDay);

    res.status(200).json({
      success: true,
      riskData,
    });
  } catch (error) {
    console.error('Error predicting budget risk:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get recent transactions
export const getRecentTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const transactions = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).json({ error: error.message });
  }
};
