import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../controllers";

const router = Router();

router.post("/", createProduct);
router.get("/", listProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as products };
