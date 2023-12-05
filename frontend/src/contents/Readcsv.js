// frontend/src/App.js

import React, { useState, useEffect } from 'react';

function ReadCSV() {
  const [csvContent, setCsvContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sandevistan.st.ie.u-ryukyu.ac.jp/api/csv');
        const data = await response.text();
        setCsvContent(data);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Content</h1>
      <pre>{csvContent}</pre>
    </div>
  );
}

export default ReadCSV;
