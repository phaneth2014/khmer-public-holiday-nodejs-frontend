import axios  from "axios";

exports.handler = async (event, context) => {
  try {
    // We use ipapi.co because it provides full details in one request
    const clientIP = headers['x-nf-client-connection-ip'] || "Unknown";
    const response = await axios.get(`https://ipapi.co/${clientIP}/json/`);
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ip: data.ip,
        city: data.city,
        country: data.country_name,
        lat: data.latitude,
        lon: data.longitude,
        isp: data.org
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch geo data" }),
    };
  }
};