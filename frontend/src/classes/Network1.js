import React, { useEffect, useState } from 'react';


const Network1 = () => {
    const [syllabus, setSyllabus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lct_year = 2023;
                const lct_cd = 617006001;
                const je_cd = 1;

                const response = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/getclass?lct_year=${lct_year}&lct_cd=${lct_cd}&je_cd=${je_cd}`);
                const data = await response.text();

                setSyllabus(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='col-xl-8'>
            <div className='card'>
                <div className='card-body pt-3'>
                    <ul className='nav nav-tabs nav-tabs-borderd' role='tablist'>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link active' data-bs-toggle='tab' data-bs-target='#syllabus' aria-selected='true' role='tab'>シラバス</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#review' aria-selected='false' role='tab' tabIndex='-1'>評価</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#memo' aria-selected='false' role='tab' tabIndex='-1'>メモ</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#qa' aria-selected='false' role='tab' tabIndex='-1'>質問</button>
                        </li>
                    </ul>
                </div>

                <div className='tab-content pt-2'>
                    
                    <div className='tab-pane fade syllabus active show' id='syllabus' role='tabpanel'>
                        <h5 className='card-title'>Syllabus</h5>
                        <div dangerouslySetInnerHTML={{ __html: syllabus }} />
                    </div>

                    <div className='tab-pane fade review' id='review' role='tabpanel'>
                        <h5 className='card-title'>Review</h5>
                        <p>This is review tab.</p>
                    </div>

                    <div className='tab-pane fade memo' id='memo' role='tabpanel'>
                        <h5 className='card-title'>Memo</h5>
                        <p>This is memo tab.</p>
                    </div>

                    <div className='tab-pane fade qa' id='qa' role='tabpanel'>
                        <h5 className='card-title'>Q&A</h5>
                        <p>This is Q&A tab.</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Network1;