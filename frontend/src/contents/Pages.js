import React from 'react';
import { useNavigate } from 'react-router-dom';


function Pages() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/csvtest');
    };

    return (
        <div>
            <h2>Pages</h2>
            <p>This is the Page Navigate.</p>
            <a href="/csvtest" onClick={handleNavigate}>
                Go to CSV test
            </a>
        </div>
    );
}

export default Pages;