import React, { useEffect, useState } from "react";
import "../assets/css/calendar.css";
import {
  convertToKhmerNumerals,
  convertEngToKhmerMonth,
} from "../services/convertToKhmerNum.js";

export default function Holiday() {
  const [holidays, setHolidays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://khmer-calendar.netlify.app/api/holidays?year=${year}&month=${month + 1}`,
      ).then((res) => res.json());
      const sortedHolidays = res.holidays.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );
      const groupedByMonth = Object.groupBy(sortedHolidays, ({ date }) => {
        const d = new Date(date);
        // Returns month name (e.g., "January")
        return d.toLocaleString("km-KH", { month: "long" });
      });

      // console.log(groupedByMonth);
      setHolidays(groupedByMonth);
    };
    getData();
  }, [year, month]);
  return (
    <div className="holiday-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year - 1, month))}>
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <div className="calendar-title">
          <p className="khmer-font" style={{ fontSize:"14px" }}>
            ព្រឹត្តិការណ៍សម្រាក ឆ្នាំ{convertToKhmerNumerals(year)}{" "}
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "-20px" }}>
            Events for year {year}
          </p>
        </div>

        <button onClick={() => setCurrentDate(new Date(year + 1, month))}>
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>
      <div
        className="holiday-list-ui"
        style={{ border: "none", width: "100%" }}
      >
        <h3 className="khmer-font">ព្រឹត្តិការណ៍ប្រចាំឆ្នាំ</h3>
        <div className="holiday-list-container">
          {Object.entries(holidays).map(([month, date]) => (
            <div key={month}>
              <h3 className="khmer-font">{(month)} {(year)}</h3>
              <ul className="holiday-list">
                {date.map((d, index) => (
                  <li key={index} style={{ background:"transparent" }}>
                    <span className="holiday-date" style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {new Date(d.date).getDate()}
                    </span>{" "}
                    <span className="holiday-name">{d.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* {holidays.map((holiday, index) => (
            <li key={index} className="khmer-font">
              <span className="holiday-date">
                {convertToKhmerNumerals(new Date(holiday.date).getDate())}
                <br />
                {converToKhmerMonth(new Date(holiday.date).getMonth())}
              </span>
              <span className="holiday-name">{holiday.description}</span>
            </li>
          ))} */}
        </div>
      </div>
    </div>
  );
}
