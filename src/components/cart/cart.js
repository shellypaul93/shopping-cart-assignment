import './cart.scss';
import { handleEvent } from '../../index.js';
import LowestPrice from '../../../static/images/lowest-price.png';
import Toast from '../toast/toast';
import { cartRenderLocation, filterCart, getTotalCartItems } from '../../utils/utils.js';
import SignIn from '../signin/signin';

class Cart {

  render(cartItems = [], navBar) {

    const main = document.querySelector(cartRenderLocation());
    cartItems = filterCart(cartItems);
    main.innerHTML = this.getCartTemplate(cartItems);
    const cartIsEmpty = document.getElementById('empty-cart');
    if (cartIsEmpty) {
      document.getElementById('empty-cart').onclick = function() {
        handleEvent({ target: { name: 'products' } });
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'none';
        }
      };
    }

    const cartIsFilled = document.getElementById('filled-cart');
    if (cartIsFilled) {
      document.getElementById('filled-cart').onclick = function() {
        if (window.sessionStorage.getItem('user')) {
          handleEvent({ target: { name: 'checkout' }});
          handleEvent({ target: { name: 'cart' }});
        } else {
          new Toast().render('To checkout items, you need to login first !');
          debugger;
          new SignIn().render();
        }
        const modal = document.getElementById('myModal');
        if (modal) {
          modal.style.display = 'none';
        } 
      };
    }

    document.querySelectorAll('#cartPage #product-details button').forEach(
      element => {
        element.onclick = function(event) {
          const { id, name } = event.target;
          let totalItems = 0;
          cartItems.forEach((item) => {
            totalItems += item.count;
            if (item.id === id) {
              const quantity = Number(item.count);
              const stock = Number(item.updatedStock);
              if (name === 'decrement' && quantity > 0) {
                item.count = quantity - 1;
                item.updatedStock = stock + 1;
                totalItems -= 1;
                return;
              }  
              const totalStock = item.stock;
              if (name === 'increment') {
                if (quantity < totalStock) {
                  item.count = quantity + 1;
                  item.updatedStock = stock - 1;
                  totalItems += 1;
                } else if (quantity === totalStock) {
                  new Toast().render(`${item.name} is out of stock!`);
                }
                return;
              }
            }
          });
          cartItems = filterCart(cartItems);
          navBar.updateCart(totalItems);
          handleEvent({ target: { name: 'buy', value: cartItems } });
          handleEvent({ target: { name: 'cart' }});
        }
      }
    )
    return cartItems;
  }

  getCartTemplate(cartItems = []) {
    let cartTotal = 0;
    let totalItems = 0;
    totalItems = getTotalCartItems(cartItems);
    const message = `<div class='flex' id='message'>
      <img src=${LowestPrice} alt='Lowest Price Guaranteed'></img>
        <summary><p> You won't find it cheaper anywhere </p></summary>
      </div>`;
  
    const summary =
      totalItems === 0
        ? `<p><strong>No items in your cart</p></strong>
            <p>Your favorite items are just a click away!</p>`
        : cartItems.map(item => {
          let itemTotal = Number(item.count) * Number(item.price);
          cartTotal = cartTotal + itemTotal;
            return `<div id='product-details' style='display: flex;'>
            <img src='${item.imageURL}' alt='${item.name}'></img>
            <section>
                <p><strong>${item.name.slice(0, 130)}</strong></p>
                <button class='primary' aria-label='decrement quantity' 
                  id=${item.id} name='decrement'>-</button>
                  ${item.count}
                <button class='primary' aria-label='increment quantity' 
                  id=${item.id} name='increment'>+</button>
                  X  Rs. ${item.price}
            </section>
            <aside> Rs. ${itemTotal}</aside>
        </div>`;
          }).join('').concat(message);
  
    const footer = 
      totalItems === 0
        ? `<button class='primary' id='empty-cart'> Start Shopping </button>`
        : `<p>Promo code can be applied on payment page</p>
           <button class='primary' aria-label='Proceed to checkout at Rupees ${cartTotal}'
              id='filled-cart'><div>Proceed to Checkout</div>
               <div>Rs. ${cartTotal} </div></button>`;
  
    const cartTemplate = `
        <section id='cartPage'>
            <header> <strong>My Cart</strong> (${totalItems || 0} items) </header>
            <main id=${totalItems === 0 ? 'empty' : 'summary'}>
              ${summary}
            </main>
            <footer>${footer}</footer>
        </section>
    `;
  
    return cartTemplate;
  }
}

export default Cart;