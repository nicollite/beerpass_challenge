import "src/config/setup";
import { RuntimeOptions, runWith } from "firebase-functions";
import cors from "cors";
import express from "express";

import { errorMiddleware } from "./middleware/error.middleware";
import { routeLogger } from "./middleware/route-logger";
import { env } from "@env";
import { logger } from "@logger";
import { getRoutes } from "./routes";
import { authentication } from "./middleware/auth";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(routeLogger);

// Set the routes
app.use(getRoutes());

// Set error middlaware
app.use(errorMiddleware);

// Set express app for
if (env.app.node_env === "dev") {
  const host = "localhost";
  const port = 5000;
  app.listen(port, host, () => {
    logger.info(`listening on http://${host}:${port}`);
  });
}

//Set runtime options
const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: "1GB",
};

export const endpoints = runWith(runtimeOpts).https.onRequest(app);
