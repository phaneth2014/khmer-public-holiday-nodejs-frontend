import React, { useEffect, useState } from 'react'
import {convertToKhmerNumerals,converToKhmerMonth} from '../services/convertToKhmerNum.js';

export default function Holiday() {
  const [holidays, setHolidays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(()=>{
    const getData = async ()=>{
        const res = await fetch(
        `https://khmer-calendar.netlify.app/api/holidays?year=${year}&month=${month + 1}`,
      ).then((res) => res.json());
      res.holidays.sort((a, b) => new Date(a.date) - new Date(b.date));
      setHolidays(res.holidays);      
    }
    getData()
  },[year,month])
  return (
<div className="holiday-container">
  <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year - 1, month))}>
            <i className="bi bi-caret-left-fill"></i>
          </button>
          <div className="calendar-title">
            <p className="khmer-font">
              តារាងឈប់សម្រាក ឆ្នាំ{convertToKhmerNumerals(year)}{" "}
            </p>
            <p style={{ fontSize: "14px", color: "#666",marginTop:"-20px" }}>
              Holiday for year {year}
            </p>
          </div>

          <button onClick={() => setCurrentDate(new Date(year + 1, month))}>
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </div>
  <ul className='holiday-list' style={{ "width":"100%","padding":"0px" }}>
    {holidays.map((holiday, index) => (
      <li key={index}>
        <div>
          <b>{convertToKhmerNumerals(new Date(holiday.date).getDate())} </b>
          <br/>
          {converToKhmerMonth(new Date(holiday.date).getMonth())}
        </div>
        <div>: {holiday.description}</div>
      </li>
    ))}
  </ul>
</div>
    
  )
}
