import cors from "cors";

import express, { json, urlencoded } from "express";

const app = express();

/**
 *
 * Constants
 *
 */
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI;

/**
 *
 * Middleware
 *
 */
app.use(cors({ origin: "*" }));

// Static folder for public files
app.use(express.static("public"));

/**
 *
 * API
 *
 */

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${PORT}`);
});
