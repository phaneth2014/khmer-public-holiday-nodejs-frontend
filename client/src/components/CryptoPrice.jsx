import React, { useState, useEffect } from 'react';

const CryptoPrice = ({ symbol = 'btcusdt' }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Binance WebSocket URL (all symbols must be lowercase)
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 'c' is the field for current/closing price in the ticker stream
      setPrice(parseFloat(data.c).toFixed(2));
    };

    // Clean up the connection when the component unmounts
    return () => ws.close();
  }, [symbol]);

  return (
    <div>
      <h2>{symbol.toUpperCase()} Price</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {price ? `$${price}` : 'Loading...'}
      </p>
    </div>
  );
};

export default CryptoPrice;