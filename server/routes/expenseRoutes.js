import express from 'express';
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getCategoryBreakdown,
} from '../controllers/expenseController.js';

const router = express.Router();

// Expense routes
router.post('/', addExpense); // Add new expense
router.get('/:userId', getExpenses); // Get all expenses for a user
router.put('/:id', updateExpense); // Update an expense
router.delete('/:id', deleteExpense); // Delete an expense
router.get('/:userId/categories', getCategoryBreakdown); // Get category breakdown

export default router;
