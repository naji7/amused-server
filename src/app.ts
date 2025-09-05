import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";

import { corsOptions } from "./config";
import { notFound, serverError } from "./middleware";
import { events, products, root } from "./routes";

export const createApp = () => {
  const app = express();

  // middlewares
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(helmet());

  app.get("/openapi", (_req, res) => {
    try {
      const y = fs.readFileSync(process.cwd() + "/openapi.yaml", "utf8");
      return res.type("yaml").send(y);
    } catch (err) {
      return res.status(500).json({ message: "openapi not found" });
    }
  });

  // routers
  app.use("/", root);
  app.use("/products", products);
  app.use("/events", events);

  //error handles
  app.use(notFound);
  app.use(serverError);

  return app;
};
