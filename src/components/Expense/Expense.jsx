import React, { useState, useEffect } from 'react';
import './Expense.css';
import Layout from '../Layout/Layout';
import DetailsList from '../DetailsList/DetailsList';

const ExpensesForm = () => {
  const [formData, setFormData] = useState({
    expenseTitle: '',
    expenseAmount: '',
    date: '',
    expenseType: '',
    reference: ''
  });
  const [expensesList, setExpensesList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const storedExpenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    setExpensesList(storedExpenseData);
  }, []);

  const formFields = [
    { label: 'Expense Title', type: 'text', name: 'expenseTitle', required: true },
    { label: 'Expense Amount', type: 'number', name: 'expenseAmount', required: true },
    { label: 'Date', type: 'date', name: 'date', required: true },
    {
      label: 'Select Expense Type',
      type: 'select',
      name: 'expenseType',
      options: ['Other', 'Food', 'Transportation', 'Bills'],
      required: true
    },
    { label: 'Reference', type: 'textarea', name: 'reference', required: true }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    let updatedExpenseData;

    if (editingItem) {
      updatedExpenseData = expensesList.map((item) =>
        item.id === editingItem.id ? formData : item
      );
      setEditingItem(null);
    } else {
      const newItem = { id: Date.now(), ...formData };
      updatedExpenseData = [...expensesList, newItem];
    }

    setExpensesList(updatedExpenseData);
    localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));

    setFormData({
      expenseTitle: '',
      expenseAmount: '',
      date: '',
      expenseType: '',
      reference: ''
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    const updatedExpenseData = expensesList.filter(item => item.id !== id);
    setExpensesList(updatedExpenseData);
    localStorage.setItem('expenseData', JSON.stringify(updatedExpenseData));
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      expenseTitle: '',
      expenseAmount: '',
      date: '',
      expenseType: '',
      reference: ''
    });
  };

  return (
    <Layout>
      <div className="expense-form-container">
        <form onSubmit={handleExpenseSubmit} className="expense-form">
          <h2>{editingItem ? 'Edit Expense' : 'Expense Form'}</h2>
          {formFields.map((field, index) => (
            <div key={index}>
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option || 'Select an option'}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <button type="submit">{editingItem ? 'Update Expense' : 'Save Expense'}</button>
          {editingItem && <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
        </form>

        <div className="expenses-list">
          <h3>Stored Expenses</h3>
          {expensesList.length > 0 ? (
            expensesList.map((expense) => (
              <DetailsList
                key={expense.id}
                title={expense.expenseTitle || 'Unknown Title'}
                image="/expenses.svg"
                details={`Amount: ${expense.expenseAmount}`}
                backgroundColor="#fce4ec"
                width="90%"
                justifyContent="space-between"
                Date={expense.date}
                alignItems="center"
                onEdit={() => handleEdit(expense)}
                onDelete={() => handleDelete(expense.id)}
              />
            ))
          ) : (
            <p>No expenses found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ExpensesForm;
