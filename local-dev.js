import express from "express";

import cors from "cors";
import routes from "./netlify/routes/index.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Express server on Netlify is running..." });
});

app.use("/api", routes);

app.listen(3000, () => {
    console.log("Local test server running on http://localhost:3000");
});