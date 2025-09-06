import { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: "*",
  // credentials: true,
};

export const LOW_STOCK_THRESHOLD = 5;
export const LOW_STOCK_TOPIC = "LowStockWarning";

// aws
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const PRODUCT_EVENTS_TOPIC_ARN =
  process.env.PRODUCT_EVENTS_TOPIC_ARN || "";
export const LOW_STOCK_TOPIC_ARN = process.env.LOW_STOCK_TOPIC_ARN || "";
export const S3_BUCKET_NAME =
  process.env.S3_BUCKET_NAME || "default-bucket-name";
