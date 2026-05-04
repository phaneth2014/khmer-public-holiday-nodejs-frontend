// netlify/functions/get-ip.js
exports.handler = async (event, context) => {
  const clientIP = event.headers['x-nf-client-connection-ip'];
  
  return {
    statusCode: 200,
    body: JSON.stringify({ ip: clientIP }),
  };
};