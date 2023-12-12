import React, { useState, useEffect } from 'react';

const Programming2 = () => {
    const [syllabus, setSyllabus] = useState(null);
    const [draftReviews, setDraftReviews] = useState(['', '']);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lct_year = 2023;
                const lct_cd = 610011072;
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

    const saveReview = () => {
        setReviews(prevReviews => [...prevReviews, [...draftReviews]]);
        setDraftReviews(['', '']);
    };

    const reviewsChange = (index, value) => {
        setDraftReviews(prevReviews => {
            const newPreviews = [...prevReviews];
            newPreviews[index] = value;
            return newPreviews;
        });
    };

    useEffect(() => {
        console.log('Reviews:', reviews);
    }, [reviews]);

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
                        <span>
                        {reviews.map((values, index) => (
                            <div key={index}>
                            <span>評価: {values[0]}</span> <br />
                            <span>評価内容: {values[1]}</span>
                            </div>
                        ))}
                        </span>

                        <div>
                        <select
                            value={draftReviews[0]}
                            onChange={(event) => {
                                reviewsChange(0, event.target.value);
                            }}
                        >
                            <option value="評価段階">評価段階</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>

                            <input
                                type='text'
                                placeholder='この講義は楽しい, この教授の授業はわかりやすい, etc'
                                value={draftReviews[1]}
                                onChange={(event) => {
                                    reviewsChange(1, event.target.value)
                                }}
                            ></input>
                            <button
                                onClick={() => saveReview()}
                            >投稿する</button>
                        </div>
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
}

export default Programming2;