import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border: 2px solid #ddd; /* テーブル全体の境界線 */
`;

const ThTd = styled.td`
    border: 1px solid #ddd; /* カラムの境界線 */
    padding: 10px;
    text-align: left;
    min-width: 150px; /* カラムの最小幅を指定（適切な値に調整） */
`;

const Th = styled.th`
    ${ThTd};
    background-color: #f2f2f2;
`;

const Link = styled.a`
    text-decoration: none;
    color: blue;
`;

function CSVTest() {
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDB();
    }, []);

    const fetchDB = async () => {
        try {
            const response = await fetch('https://sandevistan.st.ie.u-ryukyu.ac.jp/api/csv');
            if (response.ok) {
                const result = await response.json();
                setInfo(result);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleNavigate = (route) => {
        console.log('Go to: ', route);
        navigate(route);
    };

    return (
        <div>
            <h1>知能情報の講義一覧です</h1>

            <StyledTable>
                <thead>
                    <tr>
                        <Th>科目番号</Th>
                        <Th>科目名</Th>
                        <Th>単位</Th>
                        <Th>週時間</Th>
                        <Th>必須選択</Th>
                        <Th>担当教員名</Th>
                        <Th>登録人員</Th>
                        <Th>受講年次</Th>
                        <Th>曜日</Th>
                        <Th>限数</Th>
                        <Th>教室</Th>
                        <Th>期間</Th>
                        <Th>許可コード</Th>
                        <Th>備考</Th>
                        <Th>URL</Th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((inf, index) => (
                        <tr key={index}>
                            <ThTd>{inf.lecture_num2}</ThTd>
                            <ThTd>
                                <a href={inf.site_url} onClick={() => handleNavigate(inf.site_url)}>{inf.lecuture_name}</a>
                            </ThTd>
                            <ThTd>{inf.unit}</ThTd>
                            <ThTd>{inf.week_time}</ThTd>
                            <ThTd>{inf.must}</ThTd>
                            <ThTd>{inf.teacher}</ThTd>
                            <ThTd>{inf.member}</ThTd>
                            <ThTd>{inf.scl_year}</ThTd>
                            <ThTd>{inf.week_day}</ThTd>
                            <ThTd>{inf.lecture_time}</ThTd>
                            <ThTd>{inf.classroom}</ThTd>
                            <ThTd>{inf.lecture_limit}</ThTd>
                            <ThTd>{inf.per_code}</ThTd>
                            <ThTd>{inf.etc}</ThTd>
                            <ThTd>{inf.site_url}</ThTd>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
}

export default CSVTest;