import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "../config";

export const snsClient = new SNSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const publishToSNS = async (
  topicArn: string,
  subject: string,
  message: any
) => {
  const command = new PublishCommand({
    TopicArn: topicArn,
    Message: JSON.stringify(message),
    Subject: subject,
  });

  const response = await snsClient.send(command);
  console.log("SNS message published:", response.MessageId);
  return response;
};
