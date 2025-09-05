import { CreateProductDTO, UpdateProductDTO } from "../dto";
import { prisma } from "../prisma/prisma.service";

export const createProductService = async (data: CreateProductDTO) => {
  return prisma.product.create({ data });
};

export const listProductsService = async () => {
  return prisma.product.findMany();
};

export const updateProductService = async (
  id: string,
  data: UpdateProductDTO
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProductService = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
