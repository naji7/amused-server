export type CreateProductDTO = {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
};

export type UpdateProductDTO = {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
};

export enum Category {
  ELECTRONICS = "ELECTRONICS",
  FASHION = "FASHION",
  HOME = "HOME",
  BOOKS = "BOOKS",
  TOYS = "TOYS",
}
