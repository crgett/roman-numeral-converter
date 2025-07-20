import client, { Counter } from "prom-client";
import express from "express";

client.collectDefaultMetrics();

export const errorCounter = new Counter({
  name: "app_errors_count",
  help: "Total number of application errors.",
  labelNames: ["location", "type"],
});

export const successCounter = new Counter({
  name: "app_successes_count",
  help: "Total number of successful (errorless) application calls.",
});

export const unexpectedDigitCounter = new Counter({
  name: "unexpected_digit_count",
  help: "Total number of times the converter tried to parse a digit that wasn't 1-9.",
  labelNames: ["digit"],
});

const router = express.Router();
router.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

export default router;
