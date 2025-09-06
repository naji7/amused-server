import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../controllers";
import { validateBodyParams } from "../middleware";
import { uploadAws } from "../services/aws.service";

const router = Router();

router.post(
  "/",
  uploadAws.single("image"),
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
