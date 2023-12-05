import React from 'react';


const Network2 = () => {
    return (
        <div className='col-xl-8'>
            <div className='card'>
                <div className='card-body pt-3'>
                    <ul className='nav nav-tabs nav-tabs-borderd' role='tablist'>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link active' data-bs-toggle='tab' data-bs-target='#syllabus' aria-selected='true' role='tab'>シラバス</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#review' aria-selected='false' role='tab' tabindex='-1'>評価</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#memo' aria-selected='false' role='tab' tabindex='-1'>メモ</button>
                        </li>
                        <li className='nav-item' role='presentation'>
                            <button className='nav-link' data-bs-toggle='tab' data-bs-target='#qa' aria-selected='false' role='tab' tabindex='-1'>質問</button>
                        </li>
                    </ul>
                </div>

                <div className='tab-content pt-2'>
                    
                    <div className='tab-pane fade syllabus active show' id='syllabus' role='tabpanel'>
                        <h5 className='card-title'>Syllabus</h5>
                        <p>This is syllabus tab.</p>
                    </div>

                    <div className='tab-pane fade review' id='review' role='tabpanel'>
                        <h5 className='card-title'>Review</h5>
                        <p>星5 すごく面白い</p>
                    </div>

                    <div className='tab-pane fade memo' id='memo' role='tabpanel'>
                        <h5 className='card-title'>Memo</h5>
                        <p>きょう学んだこと</p>
                        <p></p>
                    </div>

                    <div className='tab-pane fade qa' id='qa' role='tabpanel'>
                        <h5 className='card-title'>Q&A</h5>
                        <p>Q この講義はおすすめですか</p>
                        <p>A すごく難しいですが、おもしろいです^^</p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Network2;