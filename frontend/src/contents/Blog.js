import React, { useState, useEffect } from 'react';
import RoutesComponent from '../Routes';
import Footer from '../partials/Footer';

function Blog() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchDB();
    }, []);

    const fetchDB = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (response.ok) {
                const result = await response.json();
                setUsers(result);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blog;