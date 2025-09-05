import { Request, Response } from "express";
import { notificationBus } from "../services/notification.service";
import { Client } from "../interface";

const clients: Client[] = [];

export const sseEvents = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  const send = (event: string, data: any) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  const onLowStock = (data: any) => {
    send("lowStock", data);
  };
  notificationBus.on("lowStock", onLowStock);
  const intervalId = setInterval(() => res.write(": keep-alive\n\n"), 5000);
  req.on("close", () => {
    clearInterval(intervalId);
    notificationBus.off("lowStock", onLowStock);
    res.end();
  });

  // res.setHeader("Content-Type", "text/event-stream");
  // res.setHeader("Cache-Control", "no-cache");
  // res.setHeader("Connection", "keep-alive");
  // res.flushHeaders();

  // const clientId = Date.now().toString();
  // const newClient: Client = { id: clientId, res: res as any };
  // clients.push(newClient);

  // // keep-alive ping
  // const intervalId = setInterval(() => res.write(": keep-alive\n\n"), 5000);

  // req.on("close", () => {
  //   clearInterval(intervalId);
  //   const index = clients.findIndex((c) => c.id === clientId);
  //   if (index !== -1) clients.splice(index, 1);
  // });
};

export const snsEndpoint = async (req: Request, res: Response) => {
  const messageType = req.headers["x-amz-sns-message-type"];

  if (messageType === "SubscriptionConfirmation") {
    const subscribeUrl = req.body.SubscribeURL;
    await fetch(subscribeUrl);
    console.log("SNS subscription confirmed");
  }

  if (messageType === "Notification") {
    const notification = JSON.parse(req.body.Message);

    clients.forEach((client) => {
      (client.res as any).write(`event: lowStock\n`);
      (client.res as any).write(`data: ${JSON.stringify(notification)}\n\n`);
    });
  }

  res.status(200).send("OK");
};
