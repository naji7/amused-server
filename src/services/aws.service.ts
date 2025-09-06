import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  LOW_STOCK_THRESHOLD,
  LOW_STOCK_TOPIC_ARN,
  S3_BUCKET_NAME,
} from "../config";

const snsClient = new SNSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const publishLowStock = async (product: any) => {
  const payload = {
    productId: product.id,
    productName: product.name,
    sellerId: product.sellerId,
    quantity: product.quantity,
    threshold: LOW_STOCK_THRESHOLD,
    type: "LowStockWarning",
  };

  const command = new PublishCommand({
    TopicArn: LOW_STOCK_TOPIC_ARN,
    Message: JSON.stringify(payload),
  });

  try {
    const response = await snsClient.send(command);
    console.log("SNS message sent, MessageId:", response.MessageId);
  } catch (error) {
    console.error("Error sending SNS message:", error);
  }
};

export const uploadAws = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME,
    // acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
  }),
});
