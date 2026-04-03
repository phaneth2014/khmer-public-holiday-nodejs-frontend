export const fetchExchangeRates = async (req, res) => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
};

export const fetchNBCRates = async (req, res) => {
    try {
        const response = await fetchAndStoreNBCRates();
        res.status(200).json(response);

    } catch (error) {
        console.error("Error fetching NBC rates:", error);
        res.status(500).json({ error: "Failed to fetch NBC rates" });
    }
};


export const fetchAndStoreNBCRates = async () => {
    const response = await fetch('https://www.nbc.gov.kh/english/economic_research/exchange_rate.php');
        const data = await response.text();
        const content = data.indexOf("Official Exchange Rate");

        if (content !== -1) {
            const ratecontent = data.substring(content + 47, content + 51).trim(); // Adjust the length as needed to capture the full rate information
            const rateDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
            const rate = parseInt(ratecontent.trim()); // Adjust the length as needed to capture the full rate information
            const arr = [{ date: rateDate, rate: rate, currency: "KHR", source: "NBC" }];
           return arr;
        } else {
            throw new Error("Exchange rate not found in NBC response");
        }
};