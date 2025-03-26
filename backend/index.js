import "dotenv/config";

import cors from "cors";
import express, { json, urlencoded } from "express";

// Routes
import authRoutes from "./api/auth/auth.route.js";
import journalRoutes from "./api/journal/journal.route.js";
import categoryRoutes from "./api/categories/category.route.js";

// Utils
import { APP_HOST, APP_PORT } from "./utils/constants.js";
import { DB } from "./utils/db.js";
import { verifyToken } from "./utils/auth.utils.js";

const app = express();

const API_VERSION = "v1";
const BODY_SIZE_LIMIT = "5mb";

/**
 *
 * Middleware
 *
 */
app.use(cors({ origin: "*" }));

// Update incoming request body
app.use(json({ limit: BODY_SIZE_LIMIT }));
app.use(urlencoded({ extended: true, limit: BODY_SIZE_LIMIT }));

// Static folder for public files
app.use(express.static("public"));

app.use(urlencoded({ extended: true, limit: BODY_SIZE_LIMIT }));

/**
 *
 * Base ping endpoint
 *
 */
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/**
 *
 * API
 *
 */
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/journal`, verifyToken, journalRoutes);
app.use(`/api/${API_VERSION}/categories`, verifyToken, categoryRoutes);

app.listen(APP_PORT, APP_HOST, async () => {
  console.log(`Listening on ${APP_PORT}`);

  // Sync all models to tables in database
  await DB.sync({});
});
