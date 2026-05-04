// netlify/functions/get-ip.js

exports.handler = async (event, context) => {
  // Use lowercase keys - Netlify headers are usually normalized to lowercase
  const headers = event.headers;
  
  const clientIP = headers['x-nf-client-connection-ip'] || "Unknown";
  const city = headers['x-nf-client-header-city'] || "Unknown";
  const country = headers['x-nf-client-header-country'] || "Unknown";
  
  // Safe splitting for Lat/Lon
  const latLong = headers['x-nf-client-header-lat-long'] || "";
  const [lat, lon] = latLong ? latLong.split(',') : ["0", "0"];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      ip: clientIP, 
      city, 
      country, 
      lat: lat.trim(), 
      lon: lon.trim() 
    }),
  };
};