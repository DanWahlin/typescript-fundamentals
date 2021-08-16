import { Product } from './interfaces';

// This will act as the foundation for other Product type classes (FoodProduct, SportingProduct)
abstract class ProductBase implements Product {
  constructor(public id: number, public name: string, public icon: string) {}
  validate(): boolean {
    throw new Error('Not implemented');
  }
}

export class FoodProduct extends ProductBase {
  validate(): boolean {
    return !!this.id && !!this.name && !!this.icon;
  }
}
