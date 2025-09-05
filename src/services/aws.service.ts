import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  LOW_STOCK_THRESHOLD,
  LOW_STOCK_TOPIC_ARN,
} from "../config";

const snsClient = new SNSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
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
