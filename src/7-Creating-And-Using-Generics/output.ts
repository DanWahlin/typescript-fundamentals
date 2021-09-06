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
  const items: Array<T> = await response.json();
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

    async getItems(): Promise<FoodProduct[]> {
      this.items = await getList<FoodProduct>(productsURL);
      return this.items;
    }

    getItemById(id: number): FoodProduct | undefined {
      return this.items ? this.items.find((p) => (id = p.id)) : undefined;
    }
  }

  const foodModel: FoodModel = new FoodModel();
  await foodModel.getItems();
  console.log(`${prefix} Generic Interface`);
  console.table(foodModel.items);

  // generic classes

  // see GenericModel<T>

  const genericFoodModel = new GenericModel<FoodProduct>(productsURL);
  await genericFoodModel.getItems();
  console.log(`${prefix} Generic Class`);
  console.table(genericFoodModel.items);

  // generic constraints

  // see GenericModel and how it extends the T ==> class GenericModel<T extends HasId> {}

  // ReadOnly<T> and Partial<T>

  let model: FoodModel = new FoodModel();
  await model.getItems();
  let roFoodItem: Readonly<FoodProduct | undefined> = model.getItemById(10);
  // roFoodItem.name = 'some name';
  // roFoodItem.icon = 'some icon';

  const pear = { name: 'pear' };
  // let pearFood: FoodProduct = pear;
  let pearFood: Partial<FoodProduct> = pear;
}
