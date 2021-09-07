import { productsURL, FoodProduct, customersURL } from '../lib';

const prefix = '🐉 ';

interface HasId {
  id: number;
}

class GenericModel<T extends HasId> {
  public items: T[] | undefined;
  constructor(public url: string) {}

  async getItems(): Promise<T[]> {
    this.items = await getList<T>(this.url);
    return this.items;
  }

  getItemById(id: number): T | undefined {
    return this.items ? this.items.find((p) => (id = p.id)) : undefined;
  }
}

const foodModel = new GenericModel<FoodProduct>(productsURL);

export default async function updateOutput(id: string = 'output') {
  // const products = await getProducts();
  // const products = await getList<FoodProduct>(productsURL);
  const products = await foodModel.getItems();

  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: FoodProduct[]): string {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

async function getProducts(): Promise<FoodProduct[]> {
  const response: Response = await fetch(productsURL);
  const products: FoodProduct[] = await response.json();
  return products;
}

async function getList<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  const items: T[] = await response.json();
  return items;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

async function runTheLearningSamples() {
  // Reusable code with generics
  function whatIsIt_number(arg: number): number {
    return arg;
  }

  console.log(`${prefix} Generics Overview`);
  console.log(whatIsIt_number(11));

  function whatIsIt_string(arg: string): string {
    return arg;
  }
  console.log(whatIsIt_string('john'));

  function whatIsIt_any(arg: any): any {
    return arg;
  }
  console.log(whatIsIt_any(11));
  console.log(whatIsIt_any('john'));

  function whatIsIt_typed<T>(arg: T): T {
    return arg;
  }

  let n: number = whatIsIt_typed<number>(11);
  let s: string = whatIsIt_typed<string>('john');
  let b: boolean = whatIsIt_typed<boolean>(true);
  console.log(n, s, b);

  // generics on functions

  // ~ examine getProducts() and how it returns a Promise<FoodProduct[]>
  // ~ examine getList() and how it returns a Promise<T[]>

  interface Customer {
    id: number;
    name: string;
  }

  async function getData() {
    console.log(`${prefix} Generic Functions`);

    const products = await getList<FoodProduct>(productsURL);
    console.table(products);

    const customers = await getList<Customer>(customersURL);
    console.table(customers);
  }
  await getData();

  // generic interface

  interface Model<T> {
    items: T[] | undefined;
    getItems: () => Promise<T[]>;
    getItemById: (id: number) => T | undefined;
  }

  class FoodModel implements Model<FoodProduct> {
    public items: FoodProduct[] | undefined;

    async getItems(): Promise<FoodProduct[]> {
      this.items = await getList<FoodProduct>(productsURL);
      return this.items;
    }

    getItemById(id: number): FoodProduct | undefined {
      return this.items ? this.items.find((item) => (id = item.id)) : undefined;
    }
  }

  const foodModel: FoodModel = new FoodModel();
  await foodModel.getItems();
  console.log(`${prefix} Generic Interface`);
  console.table(foodModel.items);

  // generic classes

  // see GenericModel<T>

  const genericFoodModel = new GenericModel<FoodProduct>(productsURL);
  const genericCustomerModel = new GenericModel<Customer>(customersURL);
  await genericFoodModel.getItems();
  await genericCustomerModel.getItems();
  console.log(`${prefix} Generic Class`);
  console.table(genericFoodModel.items);
  console.table(genericCustomerModel.items);

  // generic constraints

  // see GenericModel and how it extends the T ==> class GenericModel<T extends HasId> {}

  // Built-in Constraints

  // ReadOnly<T> constraint
  const model: FoodModel = new FoodModel();
  await model.getItems();
  const foodItem: Readonly<FoodProduct | undefined> = model.getItemById(10);
  if (foodItem) {
    // foodItem.name = 'some name';
    // foodItem.icon = 'some icon';
  }

  // Partial<T> constraint
  const pear = { name: 'pear' };
  // const pearFood: FoodProduct = pear;
  const pearFood: Partial<FoodProduct> = pear;
}
