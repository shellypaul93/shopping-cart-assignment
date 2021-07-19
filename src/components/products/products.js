import './products.scss';
import { findProduct, checkProductInCart,
  fetchData, postData, sortCategories, getDevice, scrollToTop } from '../../utils/utils.js';
import Toast from '../toast/toast';
import { handleEvent } from '../../index';
import Loader from '../loader/loader';

class Products {

  constructor() {
    this.products = [];
    this.categories = [];
    this.totalItems = 0;
    this.addedToCart = [];
    this.checkout = () => {
      this.totalItems = 0;
      this.addedToCart = [];
    }
  }

  async render(...args) {
    scrollToTop();
    let [selectedCategory, addedToCart, navBar ] = args;
    this.addedToCart = addedToCart;
    try {
      if (this.products.length === 0 || this.categories.length === 0) {
        new Loader().render();
      }
      if (this.products.length === 0) {
        this.products = await fetchData('products');
      }
      if (this.categories.length === 0) {
        this.categories = await fetchData('categories');
        this.categories = await sortCategories(this.categories);
      }
    } catch (error) {
      new Toast().render('failure');
    }
    
    const sortedAndFilteredProducts = categoryName => {
      const category = this.categories.find(category => category.name === categoryName).id;
      return this.products.filter(product => product.category === category);
    };
    
    const categoriesTemplate = () => `
        <div class='only-mobile' role="navigation" 
          aria-label="Categories" tabIndex='0' id='categories'>
          <select>
            <option value="none" selected="" disabled="" hidden="">Select a category</option>
            ${this.categories.map(category => {
              return `<option value='${category.name}' 
              ${category.name === selectedCategory ? 'selected' : ''}>
                ${category.name}</option>`;}).join('')}
          </select></div>

        <div class='only-desktop only-tablet' role="navigation"
          aria-label="Categories" tabIndex='0' id='categories'>
            ${this.categories.map(category => {
              return `<p role='button' tabIndex='0' 
              class=${category.name === selectedCategory ? 'selected' : 'deselected'}
              key=${category.id}>${category.name}</p><hr/>`;}).join('')}
        </div>`;

    const productsTemplate = (categories) => `
      <div id='products'>
      ${categories.map(product => {
        return `<div key=${product.id} class='product'>
                  <p id='title'>${product.name}</p>
                  <div id='product-details'>
                      <img src='${product.imageURL}' 
                        alt='${product.name}' tabIndex='0'></img>
                      <div id='desc' tabIndex='0' aria-label='${product.description}'>
                        <p>
                          ${product.description.slice(0, 130)}</p>
                          <button aria-label='Click to buy at Rupees ${product.price}'
                          class='primary only-mobile' id=${product.id}>
                            Buy Now @ Rs.${product.price}
                          </button>
                      </div>
                  </div>
                  <div id='buy'>
                    <p class='only-desktop'> MRP Rs.${product.price}</p>
                    <button aria-label='Click to buy at Rupees ${product.price}'
                    class='primary' id=${product.id}>
                      Buy Now 
                      ${getDevice() === 'tablet' ? `@ Rs.${product.price}` : ''}
                    </button>
                  </div>
                  </div>`;
      }).join('')}</div>`;

    const productPageTemplate = `<div id="products-page"></div>`;

    const main = document.querySelector('main');
    main.innerHTML = productPageTemplate;
    const productsPage = document.getElementById('products-page');
    const update = () => {
      productsPage.innerHTML = categoriesTemplate().concat(productsTemplate(
        selectedCategory 
          ? sortedAndFilteredProducts(selectedCategory)
          : this.products));
    }
    update();
    
    productsPage.addEventListener('click', (event) => {
        const { target } = event;
        const parentAttributes = target.parentElement.attributes;
        try {
          if (target.type === 'submit') {
            const itemId = target.attributes.id.value;
            const isProductAlreadyAdded = checkProductInCart(this.addedToCart, itemId);
            const outOfStock = false;
            if (isProductAlreadyAdded && this.addedToCart.length > 0) {
              this.addedToCart.forEach(addedItem => {
                if (addedItem.id === itemId) {
                  const addedQuantity = addedItem.count;
                  const updatedStock = addedItem.updatedStock;
                  const totalStock = addedItem.stock;
                    if (addedQuantity == totalStock) {
                      new Toast().render(`${addedItem.name} is out of stock!`);
                      outOfStock = true;
                      return;
                    } else {
                      this.totalItems += 1;
                      addedItem.count = Number(addedQuantity) + 1;
                      addedItem.updatedStock = Number(updatedStock) - 1;
                      return;
                    }
                }
              });
            } else if (this.addedToCart.length === 0 || !isProductAlreadyAdded) {
              let productToAdd = findProduct(this.products, itemId);
              productToAdd = {
                ...productToAdd,
                count: 1,
                updatedStock: Number(productToAdd.stock) - 1
              };
              this.totalItems += 1;
              this.addedToCart.push(productToAdd);
            }
            if (outOfStock) return;
            postData('addToCart', {"itemId": itemId})
              .then(() => {
                navBar.updateCart(this.totalItems);
                handleEvent({ target: { name: 'buy', value: this.addedToCart } });
                new Toast().render('success');
              })
              .catch((error) => {
                new Toast().render('failure');
              });
          } else if (parentAttributes.class.value === 'only-desktop only-tablet' &&
              parentAttributes.id.value === 'categories') {
                selectedCategory = event.target.innerText;
                update();
          } else return;
        } catch (error) {
          return;
        }
      }
    );
    document.querySelector(".only-mobile > select").addEventListener('change',
      (event) => {
        const products = sortedAndFilteredProducts(event.target.value);
        document.getElementById('products').innerHTML = productsTemplate(products);
      })
  }
}

export default Products;
