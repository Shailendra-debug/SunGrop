"use strict";

// 1. Load environment variables ONCE
require("dotenv").config();

const dns = require("node:dns");
// Forces Node.js to use Google/Cloudflare DNS (Excellent for MongoDB Atlas SRV issues)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const path = require("node:path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const proposalRoutes = require("./routes/proposals");
const rateRoutes = require("./routes/rates");
const enquiryRoutes = require("./routes/enquiries");

const app = express();
const port = Number(process.env.PORT) || 5000;
const frontendDirectory = path.resolve(__dirname, "../frontend");

app.disable("x-powered-by");

const corsOptions = {
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://sungc-counter-offer.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
// 2. Express JSON middleware applied ONCE
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/proposals", proposalRoutes);
app.use("/api/rates", rateRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use(express.static(frontendDirectory));

// 404 Handler for API
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Global Error Handler
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Request body must contain valid JSON" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: "An unexpected server error occurred" });
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to the backend .env file.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  app.listen(port, () => {
    console.log(`🚀 Sungroups app and API listening at http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(`❌ Unable to start server: ${error.message}`);
  process.exitCode = 1;
});
