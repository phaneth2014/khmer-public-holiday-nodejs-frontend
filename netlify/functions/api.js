import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import routes from '../routes/index.route.js';

dotenv.config()

const app = express();

app.use(cors({
  origin: [process.env.LOCAL_URL,process.env.APP_URL, "https://khmer-public-holiday.onrender.com"], // allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// IMPORTANT: include full path
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Express server on Netlify is running..." });
});

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

if (process.env.APP_LOCAL === 'local') {
  app.listen(PORT, () => {
    console.log(`✅ Local server running at http://localhost:${PORT}`);
  });
}


export const handler = serverless(app);