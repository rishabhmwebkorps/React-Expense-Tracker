import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Card from '../Card/Card';
import { Line } from 'react-chartjs-2';
import './Userdashboard.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import DetailsList from '../DetailsList/DetailsList';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function UserDashboard() {

    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [all, setAll] = useState([]);
   

    useEffect(() => {
        const income = JSON.parse(localStorage.getItem('incomeData')) || [];
        const expense = JSON.parse(localStorage.getItem('expenseData')) || [];
        setIncomeData(income);
        setExpenseData(expense);
        setAll(income.concat(expense));
    }, []);

    const totalIncome = incomeData.reduce((acc, curr) => 
        acc + parseFloat(curr.salaryAmount), 0);

    const totalExpenses = expenseData.reduce((acc, curr) => 
        acc + parseFloat(curr.expenseAmount), 0);

    const chartData = {
        labels: ['January', 'February', 'March'],
        datasets: [
            {
                label: 'Income',
                data: incomeData.map(data => parseFloat(data.salaryAmount)) || [0],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Expenses',
                data: expenseData.map(data => parseFloat(data.expenseAmount)) || [0],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.3,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income vs Expenses (Monthly)'
            }
        }
    };

    return (
        <Layout>
            <div className="dashboard">

                <Card
                    title="INCOME"
                    image="/investment.svg"
                    details={[`${totalIncome} Rupees`]}
                    backgroundColor='#d4edda'
                />
                <Card
                    title="EXPENSES"
                    image="/bitcoin.svg"
                    details={[`${totalExpenses} Rupees`]}
                    backgroundColor='#f8d7da'
                />
                <div className="chart-container">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>

            <div className="details-list">
                <h2>All Transactions</h2>
                {all.length > 0 ? (
                    all.map((item) => (
                        <DetailsList
                            key={item.id}
                            title={item.incomeSource || item.expenseTitle}
                            image={item.incomeSource ? "/income.svg" : "/expenses.svg"}
                            details={`Amount: ${item.salaryAmount || item.expenseAmount}`}
                            backgroundColor={item.incomeSource ? '#e0f7fa' : '#fce4ec'}
                            width="90%"
                            justifyContent="space-between"
                            Date={item.date}
                            alignItems="center"
                        />
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </Layout>
    );
}
