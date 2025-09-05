import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

let PORT = process.env.PORT || "3000";

if (cluster.isPrimary) {
  const numOfCPUs = os.cpus().length;
  console.log(`Master process PID: ${process.pid}`);
  console.log(`Forking ${numOfCPUs} workers...`);

  for (let i = 0; i < numOfCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker!`);
    cluster.fork();
  });
} else {
  const app = createApp();

  app.listen(parseInt(PORT), () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// const main = async () => {
//   const app = createApp();

//   app.listen(parseInt(PORT), () => {
//     console.log(`Server started on port ${PORT}`);
//   });
// };

// main().catch((err) => {
//   console.log(err.message);
// });
