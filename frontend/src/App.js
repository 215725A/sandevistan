import React, { useState, useEffect } from 'react';
import RoutesComponent from './Routes';
import Footer from './partials/Footer';

function App() {
    const [data, setData] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
        fetch('http://localhost:8000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/data');
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <RoutesComponent />
            <h1>Users</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username} - {user.email}
                        </li>
                    ))}
                </ul>
            <Footer />
        </div>
    );
}

export default App;