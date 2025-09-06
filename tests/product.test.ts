import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

let createdProductId: string;
let productId: string;

describe("Products API", () => {
  const newProduct = {
    sellerId: "seller123",
    name: "Test Product",
    description: "Description of testing product",
    price: 230000,
    quantity: 20,
    category: "ELECTRONICS",
    imageUrl:
      "https://amused-new.s3.us-east-1.amazonaws.com/2025-09-05T22%3A35%3A22.434Z-WhatsApp%20Image%202025-08-26%20at%2021.44.21_1f381df0.jpg",
  };

  it("should create a new product", async () => {
    const res = await request(app)
      .post("/products")
      .send(newProduct)
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newProduct.name);

    createdProductId = res.body.id;
    productId = res.body.id;
  });

  it("should return all products", async () => {
    const res = await request(app).get("/products").expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should update a product", async () => {
    const updatedData = { ...newProduct, name: "Updated Product" };
    const res = await request(app)
      .put(`/products/${productId}`)
      .send(updatedData)
      .expect(200);
    expect(res.body.name).toBe("Updated Product");
  });

  it("should delete a product", async () => {
    await request(app).delete(`/products/${productId}`).expect(204);
  });
});
