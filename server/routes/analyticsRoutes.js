import express from 'express';
import {
  getSpendingTrends,
  getMonthlySummary,
  getFinancialInsights,
  getBudgetRisk,
  getRecentTransactions,
} from '../controllers/analyticsController.js';

const router = express.Router();

// Analytics routes
router.get('/:userId/trends', getSpendingTrends); // Get spending trends
router.get('/:userId/summary', getMonthlySummary); // Get monthly summary
router.get('/:userId/insights', getFinancialInsights); // Get financial insights
router.get('/:userId/risk', getBudgetRisk); // Get budget risk prediction
router.get('/:userId/recent', getRecentTransactions); // Get recent transactions

export default router;
