import { LOW_STOCK_THRESHOLD } from "../config";
import { CreateProductDTO, UpdateProductDTO } from "../dto";
import { prisma } from "../prisma/prisma.service";
import { publishLowStock } from "./aws.service";
import { notificationBus } from "./notification.service";

export const createProductService = async (
  data: CreateProductDTO,
  file?: Express.MulterS3.File
) => {
  const imageUrl = file?.location || "";

  // console.log("file : ", file);

  const createdProduct = await prisma.product.create({
    data: {
      sellerId: data.sellerId,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      quantity: Number(data.quantity),
      category: data.category,
      imageUrl,
    },
  });

  if (createdProduct.quantity < LOW_STOCK_THRESHOLD) {
    // await publishLowStock(createdProduct);
    notificationBus.emit("lowStock", {
      productId: createdProduct.id,
      productName: createdProduct.name,
      sellerId: createdProduct.sellerId,
      quantity: createdProduct.quantity,
      threshold: LOW_STOCK_THRESHOLD,
      type: "LowStockWarning",
    });
  }

  return createdProduct;
};

export const listProductsService = async () => {
  return prisma.product.findMany();
};

export const updateProductService = async (
  id: string,
  data: UpdateProductDTO
) => {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
  });

  if (updatedProduct.quantity < LOW_STOCK_THRESHOLD) {
    // await publishLowStock(updatedProduct);
    notificationBus.emit("lowStock", {
      productId: updatedProduct.id,
      productName: updatedProduct.name,
      sellerId: updatedProduct.sellerId,
      quantity: updatedProduct.quantity,
      threshold: LOW_STOCK_THRESHOLD,
      type: "LowStockWarning",
    });
  }

  return updatedProduct;
};

export const deleteProductService = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
