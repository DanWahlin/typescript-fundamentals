import { productsURL } from './config';

export async function getProducts(): Promise<{id: number, name: string, icon: string}[]> {
  const response: Response = await fetch(productsURL);
  const products: {id: number, name: string, icon: string}[] = await response.json();
  return products;
}
