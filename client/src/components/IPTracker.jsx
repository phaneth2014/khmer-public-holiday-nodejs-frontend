import React, { useState, useEffect } from 'react';

const IPTracker = () => {
  const [data, setData] = useState({ ip: 'Fetching...', isp: '' });

  useEffect(() => {
    // Fetching from a secure IP service
    fetch('https://khmer-calendar.netlify.app/api/get-ip')
      .then(res => res.json())
      .then(json => {
        setData({ ip: json.ip, isp: json.org });
      })
      .catch(() => setData({ ip: 'Blocked by AdBlocker', isp: 'N/A' }));
  }, []);

  return (
    <div className="ip-box">
      <p><strong>Public IP:</strong> {data.ip}</p>
      <p><strong>ISP/Network:</strong> {data.isp}</p>
    </div>
  );
};

export default IPTracker