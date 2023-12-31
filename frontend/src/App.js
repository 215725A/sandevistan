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
            const response = await fetch('https://sandevistan.st.ie.u-ryukyu.ac.jp/api/data');
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