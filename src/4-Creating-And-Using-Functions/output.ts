import { productsURL } from '../lib';

const prefix = '🐉 ';

type ProductType = {
  id: number;
  name: string;
  icon?: string;
};

export default async function updateOutput(id: string = 'output') {
  const products = await getProducts();
  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: ProductType[]) {
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

async function getProducts(): Promise<ProductType[]> {
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json();
  return products;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

function runTheLearningSamples() {
  // typed parameters

  function displayProductInfo(id: number, name: string) {
    console.log(`${prefix} typed parameters`);
    console.log(`Product id=${id.toString()} and name=${name}`);
  }

  displayProductInfo(10, 'Pizza');

  // defining functions

  // function declaration
  // hoisted
  console.log(`${prefix} function declaration`);
  console.log(addNumbersDeclaration(7, 11));

  function addNumbersDeclaration(x: number, y: number) {
    const sum: number = x + y;
    return sum;
  }

  // function expression (also anonymous)
  // not hoisted
  const addNumbersExpression = function (x: number, y: number): number {
    const sum: number = x + y;
    return sum;
  };

  console.log(`${prefix} function expression`);
  console.log(addNumbersExpression(7, 11));

  // Return Scalar

  // see addNumbersDeclaration

  console.log(`${prefix} return scalar value`);
  console.log(addNumbersDeclaration(7, 11));

  const sampleProducts = [
    {
      id: 10,
      name: 'Pizza slice',
      icon: 'fas fa-pizza-slice',
    },
    {
      id: 20,
      name: 'Ice cream',
      icon: 'fas fa-ice-cream',
    },
    {
      id: 30,
      name: 'Cheese',
      icon: 'fas fa-cheese',
    },
  ];

  function getProductNames(): string[] {
    return sampleProducts.map((p) => p.name);
  }

  console.log(`${prefix} return array`);
  console.log(getProductNames());

  // Return Types

  // CREATE type ProductType

  function getProductById(id: number): ProductType | undefined {
    return sampleProducts.find((p) => (id = p.id));
  }

  console.log(`${prefix} return ProductType`);
  console.table(getProductById(10));

  // Return void

  function displayProducts(products: ProductType[]): void {
    const productNames = products.map((p) => {
      const name = p.name.toLowerCase();
      return name;
    });
    const msg = `Sample products include: ${productNames.join(', ')}`;
    console.log(`${prefix} return void`);
    console.log(msg);
  }

  displayProducts(sampleProducts);

  // async/await function

  // *** async function getProducts()

  // Arrow functions

  // see function displayProducts()
  // and layoutProducts()
  // and getProductById()

  // Optional parameters

  function createProduct(name: string, icon?: string): ProductType {
    const id = getRandomInt(1000);
    return {
      id,
      name,
      icon,
    };
  }

  const { floor, random } = Math;
  const getRandomInt = (max: number = 1000) => floor(random() * max);

  console.log(`${prefix} Optional parameters`);
  let pineapple = createProduct('pineapple', 'pine-apple.jpg');
  let mango = createProduct('mango');
  console.log(pineapple, mango);

  // Default parameters

  // modify getRandomInt()

  function createProductWithDefaults(
    name: string,
    icon: string = 'generic-fruit.jpg',
  ): ProductType {
    const id = getRandomInt();
    return {
      id,
      name,
      icon,
    };
  }

  console.log(`${prefix} Default parameters`);
  pineapple = createProductWithDefaults('pineapple', 'pine-apple.jpg');
  mango = createProductWithDefaults('mango');
  console.log(pineapple, mango);

  // *** updateOutput()

  // Rest parameters

  function buildAddress(
    street: string,
    city: string,
    ...restOfAddress: string[]
  ) {
    const address = `${street}, ${city} ${restOfAddress.join(' ')}`;
    return address;
  }

  const someAddress = buildAddress(
    '1 lois lane',
    'smallville',
    'apt 101', // rest
    'area 51', // rest
    'mystery country', // rest
  );

  console.log(`${prefix} Rest parameters`);
  console.log(someAddress);

  // Destructuring parameters

  function displayProduct({ id, name }: ProductType): void {
    console.log(`${prefix} Destructuring parameters`);
    console.log(`Product id=${id} and name=${name}`);
  }

  const prod = getProductById(10);
  if (prod) {
    displayProduct(prod);
  }

  // ~~~ Math destructuring
  // ~~~ layoutProducts() uses destructuring
}
