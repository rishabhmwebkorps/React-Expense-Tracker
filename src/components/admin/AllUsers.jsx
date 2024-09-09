import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout';
import DetailsList from '../DetailsList/DetailsList';

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);
  return (
   <>
   <AdminLayout>
   <div className="all-users">
                
                    <div className="details-list">
                <h2>All Users</h2>
                {users.length > 0 ? (
                    users.map((item) => (
                        <DetailsList
                            key={item.id}
                            title={item.username}
                            image={item.incomeSource ? "/income.svg" : "/expenses.svg"}
                            details={[item.email]}
                            backgroundColor='lightblue'
                            width="90%"
                            justifyContent="space-between"
                            Date={item.role}
                            alignItems="center"
                        />
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
                </div>
                </AdminLayout>
   </>
  )
}
