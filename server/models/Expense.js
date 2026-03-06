import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    merchant: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Food & Dining',
        'Transport',
        'Entertainment',
        'Utilities',
        'Shopping',
        'Health',
        'Education',
        'Other',
      ],
      default: 'Other',
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    aiCategorized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
expenseSchema.index({ userId: 1, date: 1 });
expenseSchema.index({ userId: 1, category: 1 });

export const Expense = mongoose.model('Expense', expenseSchema);