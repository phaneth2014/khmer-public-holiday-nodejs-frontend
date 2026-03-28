import React, { useState } from "react";
import "../assets/css/calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // Helper functions
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Create an array for the grid
  const days = [];

  // 1. Add padding for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="day empty"></div>);
  }

  // 2. Add actual days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = 
      d === new Date().getDate() && 
      month === new Date().getMonth() && 
      year === new Date().getFullYear();

    days.push(
      <div key={d} className={`day ${isToday ? "today" : ""}`}>
        {d}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1))}>{"<"}</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {year}</h2>
        <button onClick={() => setCurrentDate(new Date(year, month + 1))}>{">"}</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default Calendar;