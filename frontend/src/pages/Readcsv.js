import React, { useState, useEffect } from "react";
 
 function CSVTest() {
     const [info, setInfo] = useState([]);
 
     useEffect(() => {
         fetchDB();
     }, []);
 
     const fetchDB = async () => {
         try {
             const response = await fetch('http://localhost:8000/api/data');
             if (response.ok) {
                 const result = await response.json();
                 setInfo(result);
             } else {
                 throw new Error("Failed to fetch data");
             }
         } catch(error) {
             console.error('Error fetching data: ', error);
         }
     };
 
     return (
         <div>
             <h1>This is CSV test page.</h1>
 
             <table>
                 <thead>
                     <tr>
                         <th>整理番号</th>
                         <th>シラバス 日英区分</th>
                         <th>講義コード</th>
                         <th>科目番号</th>
                         <th>科目名</th>
                         <th>単位</th>
                         <th>週時間</th>
                         <th>必須選択</th>
                         <th>所属</th>
                         <th>担当教員名</th>
                         <th>組名</th>
                         <th>登録人員</th>
                         <th>受講年次</th>
                         <th>曜日</th>
                         <th>遠隔授業</th>
                         <th>教室</th>
                         <th>期間</th>
                         <th>許可コード</th>
                         <th>備考</th>

                     </tr>
                 </thead>
                 <tbody>
                    {info.map(inf => {
                    <tr>
                      <td>{inf.num}</td>
                      <td>{inf.langage}</td>
                      <td>{inf.lecture_num1}</td>
                      <td>{inf.lecture_num2}</td>
                      <td> {inf.lecture_name}</td>
                      <td>{inf.unit}</td>
                      <td>{inf.week_time}</td>
                      <td>{inf.must}</td>
                      <td>{inf.from_}</td>
                      <td>{inf.teacher}</td>
                      <td>{inf.class}</td>
                      <td>{inf.member}</td>
                      <td>{inf.scl_year}</td>
                      <td>{inf.week_day}</td>
                      <td>{inf.lecture_time}</td>
                      <td>{inf.remote_}</td>
                      <td>{inf.classroom}</td>
                      <td>{inf.lecture_limit}</td>
                      <td>{inf.per_code}</td>
                      <td>{inf.etc}</td>
                    </tr>
                    })}
                 </tbody>
             </table>
         </div>
     );
 }
 
 export default CSVTest;