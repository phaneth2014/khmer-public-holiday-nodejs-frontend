import React from "react";
import "../assets/css/StockDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import CryptoPrice from "../components/CryptoPrice";

// Mock data for the chart
const data = [
  { day: "Mon 15", value: 80 },
  { day: "16", value: 170 },
  { day: "Tue 16", value: 100 },
  { day: "17", value: 240 },
  { day: "Wed 17", value: 180 },
  { day: "18", value: 280 },
  { day: "Thu 18", value: 150 },
  { day: "19", value: 260 },
  { day: "Fri 19", value: 160 },
  { day: "20", value: 210 },
];
export default function Market() {
  return (
    <div className="dashboard-container">

      {/* Top Summary Cards */}
      <div className="stats-grid">
        {[
          { name: 'Apple', price: '310,40', return: '-1,10%', trend: 'down' },
          { name: 'Meta', price: '140,45', return: '-0,10%', trend: 'down', active: true },
          { name: 'Microsoft', price: '240,98', return: '+0,85%', trend: 'up' },
          { name: 'Google', price: '99,12', return: '-0,04%', trend: 'down' },
        ].map((stock) => (
          <div key={stock.name} className={`stat-card ${stock.active ? 'active' : ''}`}>
            <div className="stat-header">
              <span className="stat-name">{stock.name}</span>
              <div style={{ width: 30, height: 15, borderRadius: 10, backgroundColor: stock.trend === 'up' ? '#d1fae5' : '#fee2e2' }} />
            </div>
            <div className="stat-row">
              <span className="label-gray">Total Shares</span>
              <span style={{ fontWeight: 700 }}>${stock.price}</span>
            </div>
            <div className="stat-row">
              <span className="label-gray">Total Return</span>
              <span className={stock.trend === 'up' ? 'val-up' : 'val-down'}>{stock.return}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="main-layout">
        {/* Chart Card */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="company-info">
              <div className="logo-box"></div>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Apple inc</h2>
                <p className="label-gray" style={{ fontSize: 12, margin: 0 }}>AAPL</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#ef4444', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 10 }}>-1.10%</span>
                <span style={{ fontSize: 28, fontWeight: 800 }}>$150,70</span>
              </div>
              <p className="label-gray" style={{ fontSize: 10, marginTop: 4 }}>Last update at 14.30</p>
            </div>
          </div>

          <div className="filter-bar">
            {['1 Day', '1 Week', '1 Month', '3 Month', '1 Year', 'All'].map((t) => (
              <button key={t} className={`filter-btn ${t === '1 Week' ? 'active' : ''}`}>{t}</button>
            ))}
          </div>

          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Watchlist Card */}
        <div className="watchlist-card">
          <div className="watchlist-header">
            <h3 style={{ fontWeight: 800, fontSize: 20 }}>My watchlist</h3>
            <Plus size={20} style={{ cursor: 'pointer' }} />
          </div>
          
          {[
            { id: 'SPOT', name: 'Spotify', price: '310,40', change: '- 1,10%', bg: '#10b981' },
            { id: 'ABNB', name: 'Airbnb', price: '132,72', change: '- 10,29%', bg: '#fb7185' },
            { id: 'SHOP', name: 'Shopify', price: '28,57', change: '- 6,48%', bg: '#059669' },
            { id: 'SONY', name: 'Playstation', price: '71,86', change: '+ 0,98%', bg: '#2563eb' },
          ].map((item) => (
            <div key={item.id} className="watchlist-item">
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="asset-icon" style={{ backgroundColor: item.bg }}>{item.id.slice(0,2)}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{item.id}</div>
                  <div className="label-gray" style={{ fontSize: 11 }}>{item.name}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>${item.price}</div>
                <div style={{ fontSize: 11, color: item.change.includes('+') ? '#10b981' : '#ef4444' }}>{item.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
