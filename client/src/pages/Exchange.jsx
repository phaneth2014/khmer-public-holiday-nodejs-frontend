import React, { useEffect, useState } from "react";
import "../assets/css/ExchangeRateCard.css";
import {
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

export default function Exchange() {
  const [activeTab, setActiveTab] = useState("Exchange Rates");
  const [exchange, setExchange] = useState([]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const baseUrl =
    import.meta.env.VITE_APP_LOCAL != "production"
      ? import.meta.env.VITE_APP_URL
      : import.meta.env.VITE_BACKEND_URL;

  console.log(baseUrl);

  let currencies = [
    {
      id: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      change: "+ 3%",
      trend: "up",
      rate: "1.17424",
    },
    {
      id: "USD",
      name: "American dollar",
      flag: "🇺🇸",
      change: "- 0.1",
      trend: "down",
      rate: "1.27375",
    },
    {
      id: "GBP",
      name: "British Pound",
      flag: "🇬🇧",
      change: "- 0.2%",
      trend: "down",
      rate: "0.85162",
    },
    {
      id: "CAD",
      name: "Canadian dollar",
      flag: "🇨🇦",
      change: "+ 0.1%",
      trend: "up",
      rate: "1.48218",
    },
    {
      id: "SEK",
      name: "Swedish kronor",
      flag: "🇸🇪",
      change: "+ 0.2%",
      trend: "up",
      rate: "13.59391",
    },
    {
      id: "NOK",
      name: "Norwegian kroner",
      flag: "🇳🇴",
      change: "- 0.1%",
      trend: "down",
      rate: "13.66425",
    },
    {
      id: "DKK",
      name: "Danish kroner",
      flag: "🇩🇰",
      change: "+ 1.2%",
      trend: "up",
      rate: "8.76116",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${baseUrl}/api/last-exchange-rate?year=${year}&month=${month}`,
      ).then((res) => res.json());

      setExchange(res.data);
    };
    getData();
  }, [year, month]);

  return (
    <div className="card-container">
      <div className="exchange-card">
        {/* Header */}
        <div className="card-header">
          <h2>Exchange Rates</h2>
        </div>

        {/* Tab Toggle */}
        <div className="tab-container">
          {["Currency Calculator", "Exchange Rates"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List Header */}
        <div className="list-section">
          <h3>Popular</h3>
          <div className="table-header">
            <div>Currency</div>
            <div style={{ textAlign: "center" }}>
              Change{" "}
              <span style={{ color: "#fca5a5", fontSize: "8px" }}>CHF</span>
            </div>
            <div style={{ textAlign: "right" }}>Rate</div>
          </div>
        </div>

        {/* Currency List */}
        <div className="currency-list">
          {currencies.map((c) => (
            <div key={c.id} className="currency-row">
              <div className="currency-info">
                <div className="flag-circle">{c.flag}</div>
                <div className="currency-name">
                  {c.id} <span className="currency-full-name">- {c.name}</span>
                </div>
              </div>

              <div className="change-cell">
                <div
                  className="trend-icon"
                  style={{
                    backgroundColor: c.trend === "up" ? "#f0fdf4" : "#fef2f2",
                  }}
                >
                  {c.trend === "up" ? (
                    <ArrowUpRight size={10} color="#22c55e" />
                  ) : (
                    <ArrowDownRight size={10} color="#ef4444" />
                  )}
                </div>
                <span
                  className="change-value"
                  style={{ color: c.trend === "up" ? "#22c55e" : "#f87171" }}
                >
                  {c.change}
                </span>
              </div>

              <div className="rate-cell">{c.rate}</div>
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
      </div>
    </div>
  );
}
