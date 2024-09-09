import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { Line, Pie } from 'react-chartjs-2';
import AdminLayout from './AdminLayout'
import './AdminDashboard.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import DetailsList from '../DetailsList/DetailsList';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [allusers , setAllUsers] = useState([])
    const [users, setUsers] = useState([]);
    console.log(allusers, 'hiiiiiiiiiiii')

    useEffect(() => {

        const storedIncome = JSON.parse(localStorage.getItem('incomeData'));
        const storedExpenses = JSON.parse(localStorage.getItem('expenseData'));
        setIncomeData(storedIncome);
        setExpenseData(storedExpenses);

        const totalIncomeAmount = storedIncome.reduce((curr, item) =>
            curr + parseFloat(item.salaryAmount
            ), 0);
        const totalExpenseAmount = storedExpenses.reduce((curr, item) =>
            curr + parseFloat(item.expenseAmount),
            0);
        setTotalIncome(totalIncomeAmount);
        setTotalExpenses(totalExpenseAmount);


        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);

        setAllUsers(storedIncome.concat(storedExpenses));

    }, []);

    const netSavings = totalIncome - totalExpenses;


    const lineChartData = {
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


    const pieChartData = {
        labels: ['Food', 'Transportation', 'Bills','other'],
        datasets: [
            {
                data:  allusers.map(data => data.expenseAmount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>

                <div className="summary-cards">
                    <Card
                        title="Total Income"
                        details={[`${totalIncome} Rupees`]}
                        backgroundColor="#d4edda"
                        image='/money-investment.svg'
                    />
                    <Card title="Total Expenses"
                        details={[`${totalExpenses} Rupees`]}
                        backgroundColor="#f8d7da"
                        image='/business-accounting.svg'
                    />
                    <Card title="Net Savings"
                        details={[`${netSavings} Rupees`]}
                        backgroundColor="#fff3cd"
                        image='/finance-insurance.svg'
                    />
                </div>

                <div className='charts-parent'>

                    <div className="chart-section">
                        <h2>Income vs Expenses</h2>
                        <Line data={lineChartData} />
                    </div>

                    <div className="category-chart-section">
                        <h2>Expenses by Category</h2>
                        <Pie data={pieChartData} />
                    </div>
                </div>

                <div className="details-list">
                <h2>All Transactions</h2>
                {allusers.length > 0 ? (
                    allusers.map((item) => (
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
            

            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
