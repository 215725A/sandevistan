import React, { useEffect, useState } from 'react';

const Programming1 = () => {
    const [syllabus, setSyllabus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const lct_year = 2023;
                const lct_cd = 610004071;
                const je_cd = 1;

                // Expressサーバーのエンドポイントにリクエストを送信
                const response = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/getclass?lct_year=${lct_year}&lct_cd=${lct_cd}&je_cd=${je_cd}`);

                const result = await response.json();
        
                // 取得したデータをstateにセット
                setSyllabus(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Programming1</h1>
            {syllabus ? (
                <div>
                    <pre>{JSON.stringify(syllabus, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default Programming1;