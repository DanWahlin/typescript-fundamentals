import { getProducts, Product } from '../lib';
import { FoodProduct } from '../lib/product';

class ProductOutput {
  products: Product[] = [];
  form = this.getElement('#form');
  output = this.getElement('#output');

  constructor() {
    this.form.addEventListener('click', (event) => this.submitForm(event));
  }

  async updateOutput(id: string) {
    this.products = await getProducts();
    const html = this.layoutProducts();

    if (this.output && html) {
      this.output.innerHTML = html;

      // Add click handler
      this.output.addEventListener('click', (event) => {
        const node = event.target as HTMLElement;
        if (node.id) {
          this.showForm(+node.id);
        }
      });
    }
  }

  private layoutProducts() {
    const items = this.products.map((product) => {
      const { id, name, icon } = product;
      const productHtml = `
        <span class="card-id">#${id}</span>
        <i class="card-icon ${icon} fa-lg"></i>
        <span class="card-name">${name}</span>
        <span class="button is-pulled-right" id="${id}">Edit</button>
      `;

      const cardHtml = `
        <li>
            <div class="card" id="${id}">
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

  private getProduct(id: number) {
    const products = this.products.filter((product) => product.id === id);
    if (products.length) {
      return products[0];
    }
    return null;
  }

  private showForm(id: number) {
    this.getElement('.notification').classList.add('is-hidden');
    const product = this.getProduct(id);
    if (product) {
      // Update form fields
      this.getElement('.form-wrapper').id = id.toString();
      this.getFormElement('#product-name').value = product.name;
      this.getFormElement('#product-icon').value = product.icon;
      this.form.classList.remove('is-hidden');
    }
  }

  private submitForm(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName.toUpperCase() === 'BUTTON') {
      if (target.innerText.toUpperCase() === 'SUBMIT') {
        const id = +this.getElement('div.form-wrapper').id;
        const name = this.getFormElement('#product-name');
        const icon = this.getFormElement('#product-icon');

        // Validate data for product
        const product = new FoodProduct(id, name.value, icon.value);
        if (product.validate()) {
          const index = this.products.findIndex((p) => p.id === id);
          this.products[index] = product;
          const html = this.layoutProducts();
          this.output.innerHTML = html;
          this.hideForm();
        } else {
          this.getElement('.notification').classList.remove('is-hidden');
        }
      } else {
        this.hideForm();
      }
    }
  }

  private hideForm() {
    this.form?.classList.add('is-hidden');
  }

  private getElement(selector: string) {
    return document.querySelector(selector) as HTMLElement;
  }

  private getFormElement(selector: string) {
    return this.getElement(selector) as HTMLFormElement;
  }
}

export default new ProductOutput();
