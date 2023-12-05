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
                        <h5 className='card-title'>シラバス</h5>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>科目番号</div>
                            <div className='col-lg-9 col-md-8'>
                                知能223
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>教室</div>
                            <div className='col-lg-9 col-md-8'>
                                [木4]工1-321
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>対面/遠隔</div>
                            <div className='col-lg-9 col-md-8'>
                                対面授業
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>開講年度</div>
                            <div className='col-lg-9 col-md-8'>
                                2023
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>期間</div>
                            <div className='col-lg-9 col-md-8'>
                                後学期
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>曜日時限</div>
                            <div className='col-lg-9 col-md-8'>
                                木4
                            </div>
                        </div>
                        <div>
                            <div className='col-lg-3 col-md-4 label'>開講学部等</div>
                            <div className='col-lg-9 col-md-8'>
                                工学部工学科
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>講義コード</div>
                            <div className='col-lg-9 col-md-8'>
                                617017002
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>科目名[英文名]</div>
                            <div className='col-lg-9 col-md-8'>
                                情報ネットワークII
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>単位数</div>
                            <div className='col-lg-9 col-md-8'>
                                2
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>担当教員[ローマ字表記]</div>
                            <div className='col-lg-9 col-md-8'>
                                城間 政司
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>授業の形態</div>
                            <div className='col-lg-9 col-md-8'>
                                講義、実習
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>授業内容と方法</div>
                            <div className='col-lg-9 col-md-8'>
                                我々が日常的に利用しているインターネットは、複数の機関のLANをつなぐところから発展してきました。
                                現在に至るまで、インターネットを構成するための様々なネットワーク技術が研究・開発されており、これらはインターネットを構成する重要な要素となっています。
                                本講義では、インターネットを擬似的に構築することで、インターネットを構成するネットワーク技術を体験的に学びます。
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>評価基準と評価方法</div>
                            <div className='col-lg-9 col-md-8'>
                                小テスト(60%)、演習・課題(40%)
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>履修条件</div>
                            <div className='col-lg-9 col-md-8'>
                                情報ネットワークIを履修済み、または同等の知識(情報ネットワークの基礎)を有すること。
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>授業計画</div>
                            <div className='col-lg-9 col-md-8'>
                                <ol>
                                    <li>オリエンテーション、情報ネットワーク概論</li>
                                    <li>GNS3, Wiresharkの操作演習</li>
                                    <li>LANの設計と構築</li>
                                    <li>仮想ネットワークの設計と構築</li>
                                    <li>DHCPサーバの設計と構築</li>
                                    <li>IPフォワーディングとNAT</li>
                                    <li>LANの相互接続 : 静的ルーティング</li>
                                    <li>LANの相互接続 : 動的ルーティング</li>
                                    <li>DNSの設計と構築</li>
                                    <li>Webサーバの設計と構築(1)</li>
                                    <li>Webサーバの設計と構築(2)</li>
                                    <li>ファイアウォールとアクセス制御</li>
                                    <li>暗号技術(1)</li>
                                    <li>暗号技術(2)</li>
                                    <li>暗号技術(3)</li>
                                </ol>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-3 col-md-4 label'>使用言語</div>
                            <div className='col-lg-9 col-md-8'>
                                日本語
                            </div>
                        </div>
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

export default Network2;