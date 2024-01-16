import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Lecture = () => {
    const [syllabus, setSyllabus] = useState(null);
    const [draftReviews, setDraftReviews] = useState({ rating: '', content: '' });
    const [reviews, setReviews] = useState([]);
    const [files, setFiles] = useState([]);
    const [draftFile, setDraftFile] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [qaData, setQaData] = useState([]);
    const [answerState, setAnswerState] = useState({});

    const { className } = useParams();

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

    useEffect(() => {
        fetchReviews();
    }, [className]);

    useEffect(() => {
        fetchFiles();
    }, [className]);

    useEffect(() => {
        fetchQA();
    }, [className]);     



    const saveReview = async () => {
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
            setReviews(data);
        } catch (error) { 
            console.error('Error fetching reviews: ', error);
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await fetch(`https://files.st.ie.u-ryukyu.ac.jp/files?fileTag=${className}`);
            const data = await response.json();
            setFiles(data.files);
        } catch (err) {
            console.error('Error fetching files', err);
        }
    };

    const fetchQA = async () => {
        try {
            const response = await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/qa?class=${className}`);
            const data = await response.json();
            
            const processedData = data.map(qa => {
                const questionId = qa.question.id;
                const answersWithQuestionId = qa.answers.map(answer => ({
                    ...answer,
                    questionId,  // 回答に question_id を追加
                }));
                return {
                    ...qa,
                    answers: answersWithQuestionId,
                };
            });
    
            setQaData(processedData);
        } catch (err) {
            console.error('Error fetching qa: ', err);
        }
    };


    const handleFileChange = (e) => {
        setDraftFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', draftFile);
      
            await fetch(`https://files.st.ie.u-ryukyu.ac.jp/uploads?fileTag=${className}`, {
              method: 'POST',
              body: formData,
            });
      
            alert('File uploaded successfully');
            fetchFiles();
        } catch(error) {
            console.error('Error uploading file', error);
        }
    };

    const handleFileDownload = async (fileName) => {
        try {
            const response = await fetch(`https://files.st.ie.u-ryukyu.ac.jp/download/${className}/${fileName}`);
            const blob = await response.blob();

            // Create a download link and trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading file', error);
        }

    };

    const handleAsk = async () => {
        if (newQuestion.trim() === '') return;

        try {
            await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/question?class=${className}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class_name: className, question_text: newQuestion }),
            });

            fetchQA();
            setNewQuestion('');
        } catch (err) {
            console.error('Error send question: ', err);
        }
    };

    const handleAnswer = async (questionID, e) => {
        const answer = answerState[questionID];

        try {
            await fetch(`https://sandevistan.st.ie.u-ryukyu.ac.jp/api/answers?class=${className}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questionID: questionID, answer_text: answer }),
            });

            setAnswerState(prevState => ({
                ...prevState,
                [questionID]: '',
            }));

            fetchQA();

        } catch (err) {
            console.error('Error send answer: ', err);
        }
    };


    const renderQATree = () => {
        const qaTree = [];
        qaData.forEach((qa) => {
            const questionID = qa.question.id;
            const questionAnswer = answerState[questionID] || '';

            const questionItem = (
                <div key={questionID}>
                <p>質問: {qa.question.question_text}</p>
                回答: 
                <ul>
                    {qa.answers && qa.answers.map((answer) => (
                        <li key={answer.id}>{answer.answer_text}</li>
                    ))}
                </ul>
                <textarea
                    value={questionAnswer}
                    onChange={(e) => {
                        setAnswerState(prevState => ({
                            ...prevState,
                            [questionID]: e.target.value,
                        }));
                    }}
                    placeholder="Type your answer..."
                    required
                />
                <button onClick={() => handleAnswer(questionID)}>Answer</button>
                <hr />
                </div>
            );
            qaTree.push(questionItem);
        });
        return qaTree;
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

                <div className='tab-content pt-2 main-content'>
                    <div className='tab-pane fade syllabus active show' id='syllabus' role='tabpanel'>
                        <h5 className='card-title'>Syllabus</h5>
                        <div className='syllabus-info' dangerouslySetInnerHTML={{ __html: syllabus }} />
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
                                disabled={!draftReviews.rating || !draftReviews.content}
                            >投稿する</button>
                        </div>
                    </div>

                    <div className='tab-pane fade memo' id='memo' role='tabpanel'>
                        <h5 className='card-title'>Memo</h5>
                        <ul>
                            {files && files.map((file, index) => (
                                <li key={index}> 
                                    <button onClick={() => handleFileDownload(file)}>
                                        {file}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpeg,.jpg,.png,.txt" onChange={handleFileChange} />
                            <button onClick={handleFileUpload}>Upload</button>
                        </div>
                    </div>

                    <div className='tab-pane fade qa' id='qa' role='tabpanel'>
                        <h5 className='card-title'>Q&A</h5>
                        <p>This is Q&A tab.</p>
                        <div>
                            {renderQATree()}
                        </div>
                        <div>
                            質問: 
                            <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Ask a question..."
                            required
                            />
                            <button onClick={handleAsk}>Ask</button>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lecture;