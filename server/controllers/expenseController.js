import { Expense } from '../models/Expense.js';
import { categorizeExpense } from '../utils/aiCategorizer.js';

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { userId, merchant, amount, description, category } = req.body;

    if (!userId || !merchant || !amount) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: userId, merchant, amount' });
    }

    // Auto-categorize if not provided
    let finalCategory = category;
    let aiCategorized = false;

    if (!category) {
      finalCategory = await categorizeExpense(merchant, amount, description);
      aiCategorized = true;
    }

    const expense = new Expense({
      userId,
      merchant,
      amount: parseFloat(amount),
      category: finalCategory,
      description: description || '',
      aiCategorized,
    });

    await expense.save();
    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get expenses for a user (with optional filters)
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year, category } = req.query;

    const filter = { userId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    if (category) {
      filter.category = category;
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { merchant, amount, category, description } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      id,
      {
        merchant,
        amount: parseFloat(amount),
        category,
        description,
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      expense,
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get category breakdown
export const getCategoryBreakdown = async (req, res) => {
  try {
    const { userId } = req.params;
    const { month, year } = req.query;

    const filter = { userId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const breakdown = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const totalSpent = breakdown.reduce((sum, cat) => sum + cat.total, 0);

    const formattedBreakdown = breakdown.map((item) => ({
      category: item._id,
      amount: item.total,
      percentage: ((item.total / totalSpent) * 100).toFixed(2),
      count: item.count,
    }));

    res.status(200).json({
      success: true,
      totalSpent,
      breakdown: formattedBreakdown,
    });
  } catch (error) {
    console.error('Error getting category breakdown:', error);
    res.status(500).json({ error: error.message });
  }
};
