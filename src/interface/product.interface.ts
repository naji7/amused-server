import { Category } from "../dto";

export interface IProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}
