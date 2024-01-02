import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Lecture = () => {
    const [syllabus, setSyllabus] = useState(null);
    const [draftReviews, setDraftReviews] = useState({ rating: '', content: '' });
    const [reviews, setReviews] = useState([]);

    const { className } = useParams();
    console.log(className);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lectures_info = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/getclassinfo?class=${className}`);
                const lectures_data = await lectures_info.json();
                const lct_year = lectures_data[0].lct_year;
                const lct_cd = lectures_data[0].lct_cd;
                const je_cd = lectures_data[0].je_cd;

                const response = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/getclass?lct_year=${lct_year}&lct_cd=${lct_cd}&je_cd=${je_cd}`);
                const data = await response.text();

                setSyllabus(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [className]);

    const saveReview = async () => {
        console.log(JSON.stringify(draftReviews));
        try {
            await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/reviews?class=${className}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(draftReviews),
            });

            fetchReviews();

            setDraftReviews({ rating: '', content: '' });
        } catch (error) {
            console.error('Error saving review: ', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/reviews?class=${className}`);
            const data = await response.json();
            console.log(data);
            setReviews(data);
        } catch (error) { 
            console.error('Error fetching reviews: ', error);
        }
    };

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
                            <span>評価: {values.star}</span> <br />
                            <span>評価内容: {values.review}</span>
                            </div>
                        ))}
                        </span>

                        <div>
                            <select 
                                value={draftReviews.rating}
                                onChange={(event) => setDraftReviews({ ...draftReviews, rating: event.target.value })}
                            >
                                <option value={''}>評価を選択</option>
                                <option value={'5'}>5</option>
                                <option value={'4'}>4</option>
                                <option value={'3'}>3</option>
                                <option value={'2'}>2</option>
                                <option value={'1'}>1</option>
                            </select>
                            <input
                                type='text'
                                placeholder='この講義は楽しい, この教授の授業はわかりやすい, etc'
                                value={draftReviews.content}
                                onChange={(event) => {
                                    setDraftReviews({ ...draftReviews, content: event.target.value })
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

export default Lecture;