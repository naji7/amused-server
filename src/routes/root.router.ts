import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the amused server");
});

export { router as root };
