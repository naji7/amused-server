import { Router } from "express";

import { sseEvents, snsEndpoint } from "../controllers";

const router = Router();

router.get("/stream", sseEvents);
router.post("/sns-endpoint", snsEndpoint);

export { router as events };
