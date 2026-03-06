import React, { useState } from 'react';
import './AddExpenseForm.css';

export default function AddExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    category: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    'Food & Dining',
    'Transport',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Health',
    'Education',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setFormData({
        merchant: '',
        amount: '',
        category: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-expense-form card" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <div className="form-group">
        <label htmlFor="merchant">Merchant</label>
        <input
          type="text"
          id="merchant"
          name="merchant"
          placeholder="e.g., Starbucks"
          value={formData.merchant}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Auto-categorize</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add notes..."
          rows="3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
}
