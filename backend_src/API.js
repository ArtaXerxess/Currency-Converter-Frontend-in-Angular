const express = require("express");
const axios = require("axios");
const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

const EXCHANGE_API_KEY='de19a5def1fd93790f93d8ac'

const app = express();
const PORT = 8000;
// const API_KEY = 'de19a5def1fd93790f93d8ac';
const API_KEY = EXCHANGE_API_KEY;

const allowedOrigins = ["http://localhost:4200"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
  })
);

app.get("/api/get-exchange-rates", async (req, res) => {
  const baseCurrency = req.query.baseCurrency;

  if (!API_KEY) {
    return res.status(500).json({ error: "API Key is missing" });
  }

  if (!baseCurrency) {
    return res.status(400).json({ error: "Base currency is required" });
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;
    const response = await axios.get(url);

    if (!response.data.conversion_rates) {
      return res.status(500).json({ error: "Invalid response structure" });
    }

    return res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(500).json({
        error: `Error fetching exchange rates: ${error.response.data}`,
      });
    } else if (error.request) {
      return res.status(500).json({ error: "Error making the request" });
    } else {
      return res.status(500).json({ error: `Unexpected error: ${error.message}` });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
