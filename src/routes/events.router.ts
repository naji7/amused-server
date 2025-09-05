import { Router } from "express";

import { sseEvents } from "../controllers";

const router = Router();

router.get("/stream", sseEvents);

export { router as events };
