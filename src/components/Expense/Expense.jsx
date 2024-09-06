import React, { useState } from 'react';

const ExpensesForm = () => {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [reference, setReference] = useState('');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    
    const expenseData = {
      expenseTitle,
      expenseAmount,
      date,
      expenseType,
      reference,
    };

    const storedExpenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    storedExpenseData.push(expenseData);
    localStorage.setItem('expenseData', JSON.stringify(storedExpenseData));

    setExpenseTitle('');
    setExpenseAmount('');
    setDate('');
    setExpenseType('');
    setReference('');
  };

  return (
    <form onSubmit={handleExpenseSubmit}>
      <h2>Expenses Form</h2>
      <div>
        <label>Expense Title:</label>
        <input
          type="text"
          value={expenseTitle}
          onChange={(e) => setExpenseTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Expense Amount:</label>
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Select Expense Type:</label>
        <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)} required>
          <option value="">Select an option</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Bills">Bills</option>
        </select>
      </div>
      <div>
        <label>Reference:</label>
        <textarea
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Save Expense</button>
    </form>
  );
};

export default ExpensesForm;
