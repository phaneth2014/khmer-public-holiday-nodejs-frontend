import React, { useState, useEffect } from 'react';

const IPTracker = () => {
  const [data, setData] = useState({ ip: 'Fetching...', isp: '' });
  const [device, setDevice] = useState({ip:'', isp: '', city: '', country: '', lat: '', lon: ''});

  useEffect(() => {
    // Fetching from a secure IP service
    fetch('https://khmer-calendar.netlify.app/api/get-ip')
      .then(res => res.json())
      .then(json => {
        setData({ ip: json.ip, isp: json.org,  });
      })
      .catch(() => setData({ ip: 'Blocked by AdBlocker', isp: 'N/A' }));

    fetch('https://khmer-calendar.netlify.app/api/get-location')
      .then(res => res.json())
      .then(json => {
        setDevice({ ...device, ip: json.ip, isp: json.isp, city: json.city, country: json.country, lat: json.lat, lon: json.lon });
      })
      .catch(() => setDevice({ ...device, ip: 'Unknown', isp: 'Unknown', city: 'Unknown', country: 'Unknown', lat: 'Unknown', lon: 'Unknown' }));
  }, []);

  return (
    <div className="ip-box">
      <p><strong>Public IP:</strong> {data.ip}</p>
      <p><strong>ISP/Network:</strong> {device.isp}</p>
      <p><strong>City:</strong> {device.city}</p>
      <p><strong>Country:</strong> {device.country}</p>
      <p><strong>Latitude:</strong> {device.lat}</p>
      <p><strong>Longitude:</strong> {device.lon}</p>
    </div>
  );
};

export default IPTracker