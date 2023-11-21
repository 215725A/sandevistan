import React from 'react';
import { useNavigate } from 'react-router-dom';
//import Network2 from './contents/classes/Network2';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // '/network'にプログラム内で遷移
        navigate('About');
    };

    return (
        <div>
            <h2>Home</h2>
            <p>This is the Home page.</p>
            <a href="/classes/Network2">情報ネットワークⅡ</a>
            <a href="Image_processing">画像処理</a>
            <button onClick={handleClick}>情報ネットワーク2</button>
        </div>
    );
};



export default Home;