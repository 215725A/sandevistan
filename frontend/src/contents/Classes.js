import React from 'react';

function Classes() {
  // タイムテーブルの形式を定義する（空の場合）
  const emptyTimetable = {
    "1st": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "2nd": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "3rd": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "4th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "5th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "7th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" },
    "8th": { Mon: "", Tue: "", Wed: "", Thu: "", Fri: "" }
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
      <a href='/network2'>ネットワーク2</a>
    </div>
  );
}

export default Classes;
