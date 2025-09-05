import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../controllers";
import { validateBodyParams } from "../middleware";

const router = Router();

router.post(
  "/",
  validateBodyParams(
    "sellerId",
    "name",
    "description",
    "price",
    "quantity",
    "category"
  ),
  createProduct
);

router.get("/", listProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as products };
