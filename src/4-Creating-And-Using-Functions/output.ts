import { Product, getProducts } from '../lib';

export default async function updateOutput(id: string) {
  const products = await getProducts();

  const output = document.querySelector(`#${id}`);

  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: Product[]) {
  const items = products.map((p) => {
    const { id, name, icon } = p;
    const productHtml = `<span class="card-id">#${id}</span>
                <i class="card-icon ${icon} fa-lg"></i><span class="card-name">${name}</span>
    `;
    const card = `<li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return card;
  });
  let productList = `<ul>${items.join('')}</ul>`;
  return productList;
}
