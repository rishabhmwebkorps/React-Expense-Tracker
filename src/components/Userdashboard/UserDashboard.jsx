import React from 'react';
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
    const cardDetails1 = ['10020 Rupees'];
    const cardDetails2 = ['1000 Rupees'];
    const cardDetail3 = ['Rupees 1200']

    const income = '#d4edda';
    const expense = '#f8d7da';


    const chartData = {
        labels: ['January', 'February', 'March'],
        datasets: [
            {
                label: 'Income',
                data: [12000, 15000, 14000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Expenses',
                data: [9000, 12000, 11000],
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
                position: 'top'
            },
            title: {
                display: true,
                text: 'Income vs Expenses (Monthly)'
            }
        }
    };

    return (
        <Layout>
            <div className='dashboard'>
                <Card
                    title="INCOME"
                    image="/investment.svg"
                    details={cardDetails1}
                    backgroundColor={income}
                ></Card>

                <Card
                    title="EXPENSES"
                    image="/bitcoin.svg"
                    details={cardDetails2}
                    backgroundColor={expense}
                ></Card>

                <div className="chart-container">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>

            <div>
                <DetailsList
                    title="FOOD EXPENSES"
                    image="/income.svg"
                    details={cardDetails1}
                    backgroundColor="#e0f7fa"
                    width="90%"
                    justifyContent="space-between"
                    alignItems="center"
                />
            </div>

        </Layout>
    );
}
