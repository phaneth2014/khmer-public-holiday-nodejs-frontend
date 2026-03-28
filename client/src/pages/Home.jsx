import React, { useEffect, useState } from "react";
import { holidays } from "../services/data-api.js";
import Calendar from "../components/Calendar.jsx";
export default function Home() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const now = new Date();

    const getData = async () => {
      const ph = await holidays(now);
      setData(ph);

    };

    getData();
    console.log(data);
  }, []);

  return (
    <main className="main">
      <section className="section-calendar">
        
   
        <Calendar />

      </section>

      <section className="section-holiday">
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
    </main>
  );
}
