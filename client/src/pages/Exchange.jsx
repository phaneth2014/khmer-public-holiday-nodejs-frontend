import React, { useEffect, useState } from "react";
import "../assets/css/ExchangeRateCard.css";
import {
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import MyChart from "../components/MyChart";
import  USD from '../assets/images/usd-khr.svg';
import IPTracker from "../components/IPTracker";

export default function Exchange() {
  const [exchange, setExchange] = useState([]);
  const [currency, setCurrency] = useState([]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const baseUrl =
    import.meta.env.VITE_APP_LOCAL != "production"
      ? import.meta.env.VITE_APP_URL
      : import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${baseUrl}/api/last-exchange-rate?year=${year}&month=${month}`,
      ).then((res) => res.json());

      setExchange(res.data);

      const sorted = [...res.data].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setCurrency(sorted);
    };
    getData();
  }, [year, month]);

  return (
    <div className="card-container">
      <div className="exchange-card">
        {/* Header */}
        <div className="card-header">
          <h2 className="khmer-font">អាត្រាប្តូរប្រាក់ដុល្លារ</h2>
        </div>

        <MyChart data={exchange} />
        {/* List Header */}
        <div className="list-section">
          <h3 className="khmer-font">បង្ហាញរយៈពេល ៧ថ្ងៃចុងក្រោយ</h3>
          <div className="table-header">
            <div>Currency</div>
            <div className="khmer-font" style={{ textAlign: "center" }}>
              ថ្ងៃខែឆ្នាំ{" "}
              <span style={{ color: "#fca5a5", fontSize: "8px" }}></span>
            </div>
            <div className="khmer-font" style={{ textAlign: "right" }}>
              អាត្រា
            </div>
          </div>
        </div>

        {/* Currency List */}
        <div className="currency-list">
          {currency.map((c,i) => ( i<7 &&
            
            <div key={c.id} className="currency-row">
              <div className="currency-info">
                <div className="flag-circle"><img src={USD} width="20" height="20" /></div>
                <div className="currency-name">{"KHR/USD"}</div>
              </div>

              <div className="change-cell">
                <span className="change-value">{c.date}</span>
              </div>

              <div className="rate-cell">
                {i<7 && (<div>
                  <div className="trend-icon" style={{ backgroundColor: c.rate > currency[i+1].rate ? '#f0fdf4' : '#fef2f2' }}>
                  {c.rate > currency[i+1].rate ? (
                    <ArrowUpRight size={10} color="#22c55e" />
                  ) : (
                    <ArrowDownRight size={10} color="#ef4444" />
                  )}
                   <span className="change-value" style={{ color: c.rate > currency[i+1].rate ? '#22c55e' : '#f87171' }}>
                  
                </span>
                </div>
               
                </div>)}
                {c.rate}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="card-footer">
          <p className="timestamp">
            Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              weekday: "long", // "Monday"
              year: "numeric", // "2024"
              month: "long", // "July"
              day: "numeric", // "15"
              hour: "2-digit", // "10"
              minute: "2-digit", // "30"
              second: "2-digit", // "15"
              hour12: true, // "AM/PM"
            })}
          </p>
        </div>
         <IPTracker/>
      </div>
     
    </div>
  );
}
