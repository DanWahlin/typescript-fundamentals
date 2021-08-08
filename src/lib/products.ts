import { Product } from "./interfaces";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('../api/products.json');
  const products: [] = await response.json();
  return products;
}
