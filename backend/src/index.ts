import "./observability/tracing";

import express from "express";
import cors from "cors";

import metricsRouter from "./observability/metrics";
import logger from "./observability/logger";
import routes from "./routes/romanNumeralRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(metricsRouter);
app.use("/", routes);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
