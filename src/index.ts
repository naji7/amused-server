import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

let PORT = process.env.PORT || "3000";

const main = async () => {
  const app = createApp();

  app.listen(parseInt(PORT), () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => {
  console.log(err.message);
});
