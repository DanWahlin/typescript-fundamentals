import { productsURL } from './config';
import { Product } from './interfaces';

export async function getProducts(): Promise<Product[]> {
  const response: Response = await fetch(productsURL);
  const products: Product[] = await response.json();
  return products;
}
