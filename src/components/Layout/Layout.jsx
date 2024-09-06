import React from 'react';
import './Layout.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="image">
                <img src="/office-workplace.svg" alt="User" />
                <span>User</span>
            </div>
            <div className='items'><span><img src='/dashboard.svg'></img></span><a href="userdashboard">Dashboard</a></div>
            <div className='items'><span><img src='/expenses.svg'></img></span><a href="/expense">Expenses</a></div>
            <div className='items'><span><img src='/income.svg'></img></span><a href="/income">Income</a></div>
            {/* <div className='items'><span><img src='/transaction.svg'></img></span><a href="#contact">Transactions</a></div> */}
            <div className='items'><span><img src='/logout.svg'></img></span><a href="/">Log Out </a></div>
        </div>
    );
};

const Navbar = () => {
    return (
        <div className="navbar">
            <button className="help-button">Help & Support</button>
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <div className="main-content">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
