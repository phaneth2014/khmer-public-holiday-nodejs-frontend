import React, { useEffect, useState } from "react";
import "../assets/css/calendar.css";
import momentkh from "@thyrith/momentkh";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const khDayOfWeek = [
    "អាទិត្យ",
    "ច័ន្ទ",
    "អង្គារ",
    "ពុធ",
    "ព្រហ",
    "សុក្រ",
    "សៅរ៍",
  ];
  const khMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  // Helper functions
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array for the grid
  const days = [];
  const monthlyHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    return (    holidayDate.getMonth() === month &&
      holidayDate.getFullYear() === year);
  });
  const convertToKhmerNumerals = (num) => {
    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return num
      .toString()
      .split("")
      .map((digit) => khmerDigits[parseInt(digit)])
      .join("");
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://khmer-calendar.netlify.app/api/holidays?year=${year}&month=${month + 1}`,
      ).then((res) => res.json());
      setHolidays(res.holidays);
    };

    getData();
  }, [currentDate]);

  // 1. Add padding for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="day empty"></div>);
  }

  // 2. Add actual days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const khmerDate = momentkh.fromDate(new Date(`${year}-${month}-${d}`));
   
    const isToday =
      d === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    if (
      holidays.some((holiday) => {
        const holidayDate = new Date(holiday.date);
        return (
          holidayDate.getDate() === d &&
          holidayDate.getMonth() === month &&
          holidayDate.getFullYear() === year
        );
      })
    ) {

      days.push(
        <div key={d} className={`day holiday `} style={{ color:"green" }}>
          {khmerDate.khmer.day ==8 || khmerDate.khmer.day == 15 ? <span className="buddha"></span> : null}
          {d} <p className="moonPhase">{khmerDate.khmer.day} {khmerDate.khmer.moonPhaseName}</p>          
        </div>
      );
    } else {
      days.push(
        <div key={d} className={`day ${isToday ? "today" : ""}`}>
          {khmerDate.khmer.day ==8 || khmerDate.khmer.day == 15 ? <span className="buddha"></span> : null}
          {d} <p className="moonPhase">{khmerDate.khmer.day} {khmerDate.khmer.moonPhaseName}</p>
        </div>,
      );
    }
  }

  return (
    <section>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))}>
            <i className="bi bi-caret-left-fill"></i>
          </button>
          <div className="">
            <p className="khmer-font">
              {khMonths[month]} {convertToKhmerNumerals(year)}{" "}
            </p>
            <p style={{ fontSize: "12px", color: "#666",marginTop:"-16px" }}>
              {currentDate.toLocaleString("default", { month: "long" })} {year}
            </p>
          </div>

          <button onClick={() => setCurrentDate(new Date(year, month + 1))}>
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </div>

        <div className="calendar-grid ">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-name khmer-font">
              {khDayOfWeek[index]} <br /> <span style={{ fontSize:"10px" }}>{day}</span> 
            </div>
          ))}
          {days}
        </div>
      </div>
      {monthlyHolidays.length > 0 && (
        <div className="holiday-list">
          <h3 className="khmer-font">បញ្ជីថ្ងៃឈប់សម្រាក</h3>
          <ul>
            {monthlyHolidays.map((holiday) => (
              <li key={holiday.date} className="khmer-font">
                <span className="holiday-date">
                  {convertToKhmerNumerals(new Date(holiday.date).getDate())}{" "}
                  {khMonths[new Date(holiday.date).getMonth()]}{" "}
                </span>
              <span className="holiday-name">{holiday.description}</span>
            </li>
          ))}
            
        </ul>

      </div>
      )}
    </section>
  );
};

export default Calendar;
