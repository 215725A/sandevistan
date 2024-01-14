import React from 'react';

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <p>知能情報の知能情報による知能情報のためのサイト</p>
            
            <div>
                <h4 className='text-body-secondary'>講義情報一覧の確認</h4>
                <p>
                    Lecture listから講義情報の一覧を見ることができます
                </p>

                <h4 className='text-body-secondary'>講義情報の詳細確認</h4>
                <p>
                    「Lecture list」から講義名をクリックすることで確認することができます
                </p>

                <h4 className='text-body-secondary'>講義の評価を確認</h4>
                <p>
                    講義情報の詳細確認の手順から、「評価」をクリックすることで確認することができます <br />
                    ※評価、評価内容のどちらも入力しないとその講義に対する評価をすることはできません
                </p>

                <h4 className='text-body-secondary'>講義のメモを確認</h4>
                <p>
                    講義情報の詳細確認の手順から、「メモ」をクリックすることで講義のメモを確認できます <br />
                    講義のメモはアップロード・ダウンロードすることができます <br />
                    ※ファイル形式には制限があるのでアップロードできないものもあります
                </p>
            </div>

        </div>
    );
};

export default Home;