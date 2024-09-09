import React, { useState, useEffect } from 'react';
import './Income.css';
import Layout from '../Layout/Layout';
import DetailsList from '../DetailsList/DetailsList';

const IncomeForm = () => {
  const [formData, setFormData] = useState({
    incomeSource: '',
    date: '',
    salaryAmount: '',
    reference: '',
    incomeType: ''
  });
  const [incomeList, setIncomeList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const storedIncomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
    setIncomeList(storedIncomeData);
  }, []);

  const formFields = [
    { label: 'Income Source', type: 'text', name: 'incomeSource', required: true },
    { label: 'Date', type: 'date', name: 'date', required: true },
    { label: 'Salary Amount', type: 'number', name: 'salaryAmount', required: true },
    {
      label: 'Select Income Type',
      type: 'select',
      name: 'incomeType',
      options: ['', 'Salary', 'Business', 'Freelance'],
      required: true
    },
    { label: 'Reference', type: 'textarea', name: 'reference', required: true }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    let updatedIncomeData;
    if (editingItem) {
      updatedIncomeData = incomeList.map((item) =>
        item.id === editingItem.id ? formData : item
      );
      setEditingItem(null);
    } else {
      const newItem = { id: Date.now(), ...formData };
      updatedIncomeData = [...incomeList, newItem];
    }

    setIncomeList(updatedIncomeData);
    localStorage.setItem('incomeData', JSON.stringify(updatedIncomeData));

    setFormData({
      incomeSource: '',
      date: '',
      salaryAmount: '',
      reference: '',
      incomeType: ''
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    const updatedIncomeData = incomeList.filter(item => item.id !== id);
    setIncomeList(updatedIncomeData);
    localStorage.setItem('incomeData', JSON.stringify(updatedIncomeData));
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      incomeSource: '',
      date: '',
      salaryAmount: '',
      reference: '',
      incomeType: ''
    });
  };

  return (
    <Layout>
      <div className="income-form-container">
        <form onSubmit={handleIncomeSubmit} className="income-form">
          <h2>{editingItem ? 'Edit Income' : 'Income Form'}</h2>
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
          <button type="submit">{editingItem ? 'Update Income' : 'Save Income'}</button>
          {editingItem && <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
        </form>

        <div className="income-list">
          <h3>Incoming Transactions</h3>
          {incomeList.length > 0 ? (
            incomeList.map((income) => (
              <DetailsList
                key={income.id}
                title={income.incomeSource || 'Unknown Source'}
                image="/income.svg"
                details={`Amount: ${income.salaryAmount}`}
                backgroundColor="#e0f7fa"
                Date={income.date}
                width="90%"
                justifyContent="space-between"
                alignItems="center"
                onEdit={() => handleEdit(income)}
                onDelete={() => handleDelete(income.id)}
              />
            ))
          ) : (
            <p>No data found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IncomeForm;
