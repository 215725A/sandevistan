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
<<<<<<< HEAD
            const response = await fetch('http://localhost:8000/api/data');
=======
            const response = await fetch('https://sandevistan.st.ie.u-ryukyu.ac.jp/api/data');
>>>>>>> 81225e91efd6202bb17a4450db2554c8fd98661c
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