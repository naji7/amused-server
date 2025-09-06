import { Request, Response, NextFunction } from "express";
import {
  createProductService,
  listProductsService,
  updateProductService,
  deleteProductService,
} from "../services/product.service";
import { CreateProductDTO, UpdateProductDTO } from "../dto";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("haiii");
  try {
    const data: CreateProductDTO = req.body;
    const file = req.file;
    // console.log("fileee : ",file)
    const product = await createProductService(data, file);
    res.status(201).json(product);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await listProductsService();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data: UpdateProductDTO = req.body;
    const product = await updateProductService(id, data);
    res.status(200).json(product);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await deleteProductService(id);
    res.status(204).send(data);
  } catch (err) {
    next(err);
  }
};
