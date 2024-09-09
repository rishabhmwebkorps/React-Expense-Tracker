import React, { useEffect, useState } from 'react';

const Sidebar = () => {
    const [user,setUsers] = useState([])

useEffect(()=>{
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    setUsers(storedUsers);
},[])

    return (
        <div className="sidebar">
            <div className="image">
                <img src="/office-workplace.svg" alt="User" />
                <span>user</span>
            </div>
            <div className='items'><span><img src='/dashboard.svg'></img></span><a href="admin-dashboard">Dashboard</a></div>
            <div className='items'><span><img src='/expenses.svg'></img></span><a href="/all">Users</a></div>
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

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
