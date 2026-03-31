import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar.jsx";
export default function Home() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const now = new Date();

    const getData = async () => {
      const res = await fetch("https://khmer-calendar.netlify.app/api/holidays")
      .then(res => res.json())
      .then(data => console.log(data));
      setData(res.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.getFullYear() === now.getFullYear();
      }));

    };

    getData();
    console.log(data);
  }, []);

  return (
    <div className="calendar-container">
      <section >          
        <Calendar />
      </section>

      {data.length > 0 && (
        <section className="calendar-container">
          <div>
            <div className="calendar-title">
              <h4 id="holiday-title">
                <i className="bi bi-calendar-check"></i> ថ្ងៃឈប់សម្រាក
            </h4>
          </div>

          <ul id="holiday-list" className="holiday-list">
            <li>
              <div></div>
              <div></div>
            </li>
          </ul>
        </div>
      </section>
      )}
    </div>
  );
}
