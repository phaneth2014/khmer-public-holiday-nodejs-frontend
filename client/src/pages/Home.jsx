import React, { useEffect, useState } from "react";
import { holidays } from "../services/data-api.js";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const now = new Date();
    const getData = async () => {
      const ph = await holidays(now);
      setData(ph);
    };

    getData();
  }, []);

  return (
    <main className="main">
      <section className="section-calendar">
        <div className="calendar-header">
          <div className="calendar-title">
            <i className="bi bi-calendar3"></i>
            <h4 id="calendar-title"> Khmer holiday calendar for </h4>
          </div>
          <div className="calendar-control">
            <button id="prev-month">
              <i className="bi bi-caret-left-fill"></i>
            </button>
            |
            <button id="next-month">
              <i className="bi bi-caret-right-fill"></i>
            </button>
          </div>
        </div>
        <hr />

        <table id="tb-calendar">
          <thead>
            <tr>
              <th className="first-day">SUN</th>
              <th className="normal-day">MON</th>
              <th className="normal-day">TUE</th>
              <th className="normal-day">WED</th>
              <th className="normal-day">THU</th>
              <th className="normal-day">FRI</th>
              <th className="last-day">SAT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.day}{item.desc}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div id="today-text" className="text-today"></div>
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
