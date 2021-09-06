import { productsURL, FoodProduct, customersURL } from '../lib';

const prefix = '🐉 ';

export default async function updateOutput(id: string = 'output') {
  // const products = await getProducts();
  const products = await getList<FoodProduct>(productsURL);
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
  const items: Array<T> = await response.json();
  console.log(`Array has ${items.length} elements`);
  return items;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

async function runTheLearningSamples() {
  // any vs generics
  //  create a component that can work over a variety of types rather than a
  // single one. This allows users to consume these components and use their
  // own types.

  // generics overview
  function whatIsIt_number(arg: number): number {
    return arg;
  }
  console.log(`${prefix} Generics Overview`);
  console.log(whatIsIt_number(11));

  function whatIsIt_any(arg: any): any {
    return arg;
  }
  console.log(whatIsIt_any(11));

  function whatIsIt_typed<Type>(arg: Type): Type {
    return arg;
  }
  let n = whatIsIt_typed<number>(11);
  console.log(n);
  let s = whatIsIt_typed<string>('john');
  console.log(s);
  let b = whatIsIt_typed<boolean>(false);
  console.log(b);

  // generics on functions
  interface Customer {
    id: number;
    name: string;
  }

  // ~ examine getProducts() and how it returns a Promise<FoodProduct[]>
  // ~ examine getList() and how it returns a Promise<T[]>

  async function getData() {
    console.log(`${prefix} Generic Functions`);

    const products = await getList<FoodProduct>(productsURL);
    console.table(products);

    const customers = await getList<Customer>(customersURL);
    console.table(customers);
  }
  await getData();

  // ~ updateOutput() for the generic getList<T>

  // generic interface

  interface Model<T> {
    items: T[] | undefined;
    getItems: () => Promise<Array<T>>;
    getItemById: (id: number) => T | undefined;
  }

  class FoodModel implements Model<FoodProduct> {
    public items: FoodProduct[] | undefined;

    async getItems() {
      return await getList<FoodProduct>(productsURL);
    }

    getItemById(id: number): FoodProduct | undefined {
      if (this.items) {
        return this.items.find((p) => (id = p.id));
      }
      return undefined;
    }
  }

  const foodModel: FoodModel = new FoodModel();
  await foodModel.getItems();
  console.log(`${prefix} Generic Interface`);
  console.table(foodModel.items);

  // generic classes

  interface HasId {
    id: number;
  }

  // class GenericModel<T> {
  class GenericModel<T extends HasId> {
    public items: T[] | undefined;
    constructor(public url: string) {}

    async getItems() {
      return await getList<T>(this.url);
    }

    getItemById(id: number): T | undefined {
      if (this.items) {
        return this.items.find((i) => (id = i.id));
      }
      return undefined;
    }
  }

  const genericFoodModel = new GenericModel<FoodProduct>(productsURL);
  await genericFoodModel.getItems();
  console.log(`${prefix} Generic Class`);
  console.table(genericFoodModel.items);

  // generic constraints

  // ~ GenericModel to use HasId

  // uncomment the interface
  // extend the T ==> class GenericModel<T extends HasId> {}

  // ReadOnly<T>

  let model: FoodModel = new FoodModel();
  await model.getItems();
  let roFoodItem: Readonly<FoodProduct | undefined> = model.getItemById(10);
  // roFoodItem.name = 'some name';
  // roFoodItem.icon = 'some icon';
}
