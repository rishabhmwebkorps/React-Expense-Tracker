import React, { useState } from 'react';
import Layout from '../Layout/Layout';

const IncomeForm = () => {
  const [incomeSource, setIncomeSource] = useState('');
  const [date, setDate] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [reference, setReference] = useState('');
  const [incomeType, setIncomeType] = useState('');

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    
    const incomeData = {
      incomeSource,
      date,
      salaryAmount,
      reference,
      incomeType,
    };

    const storedIncomeData = JSON.parse(localStorage.getItem('incomeData')) || [];
    storedIncomeData.push(incomeData);
    localStorage.setItem('incomeData', JSON.stringify(storedIncomeData));

    setIncomeSource('');
    setDate('');
    setSalaryAmount('');
    setReference('');
    setIncomeType('');
  };

  return (
    <Layout>
    <form onSubmit={handleIncomeSubmit}>
      <h2>Income Form</h2>
      <div>
        <label>Income Source:</label>
        <input
          type="text"
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
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
        <label>Salary Amount:</label>
        <input
          type="number"
          value={salaryAmount}
          onChange={(e) => setSalaryAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Reference:</label>
        <textarea
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Select Income Type:</label>
        <select value={incomeType} onChange={(e) => setIncomeType(e.target.value)} required>
          <option value="">Select an option</option>
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      <button type="submit">Save Income</button>
    </form>
    </Layout>
  );
};

export default IncomeForm;
