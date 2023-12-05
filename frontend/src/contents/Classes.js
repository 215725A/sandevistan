import React from 'react';
import { useNavigate } from 'react-router-dom';

function Classes() {
  // タイムテーブルの形式を定義する（空の場合）
  const navigate = useNavigate();
  const emptyTimetable = {
    "1st": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "2nd": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "3rd": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "4th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "5th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "7th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "8th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" }
  };

  const handleNavigate = (route) => {
    console.log("Go to: ", route);
    navigate(route);
  };

  return (
    <div className="classes">
      <h1>Timetable</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(emptyTimetable).map(time => (
            <tr key={time}>
              <td>{time}</td>
              <td>{emptyTimetable[time]['Mon']}</td>
              <td>{emptyTimetable[time]['Tue']}</td>
              <td>{emptyTimetable[time]['Wed']}</td>
              <td>{emptyTimetable[time]['Thu']}</td>
              <td>{emptyTimetable[time]['Fri']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href='/network2' onClick={() => handleNavigate('/network2')}>ネットワーク2</a> <br />
      <a href='/programming1' onClick={() => handleNavigate('/programming1')}>プログラミング1</a> <br />
      <a href='/network1' onClick={() => handleNavigate('/network1')}>ネットワーク1</a>
    </div>
  );
}

export default Classes;