import React, { useState, useEffect } from 'react';

const IPTracker = () => {
  const [data, setData] = useState({ ip: 'Fetching...', isp: '', city: '', country: '', lat: '', lon: '' });

  useEffect(() => {
    // Fetching from a secure IP service
    fetch('https://khmer-calendar.netlify.app/api/get-ip')
      .then(res => res.json())
      .then(json => {
        setData({ ip: json.ip, isp: json.org, city: json.city, country: json.country, lat: json.lat, lon: json.lon });
      })
      .catch(() => setData({ ip: 'Blocked by AdBlocker', isp: 'N/A', city: 'Unknown', country: 'Unknown', lat: 'Unknown', lon: 'Unknown' }));
  }, []);

  return (
    <div className="ip-box">
      <p><strong>Public IP:</strong> {data.ip}</p>
      <p><strong>ISP/Network:</strong> {data.isp}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>Country:</strong> {data.country}</p>
      <p><strong>Latitude:</strong> {data.lat}</p>
      <p><strong>Longitude:</strong> {data.lon}</p>
    </div>
  );
};

export default IPTracker