import React, { useState, useEffect } from 'react';
import RoutesComponent from './Routes';
import Footer from './partials/Footer';

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
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
            <Footer />
        </div>
    );
}

export default App;