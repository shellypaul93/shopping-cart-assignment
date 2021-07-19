import NavBar from './components/navBar/navBar';
import Home from './components/home/home';
import Products from './components/products/products';
import Cart from './components/cart/cart';
import SignIn from './components/signin/signin';
import Footer from './components/footer/footer';
import './style/index.scss';

const navBar = new NavBar();
const products = new Products();
const cart = new Cart();
let home = new Home();
const login = new SignIn();
const footer = new Footer();
let addedToCart = [];

navBar.render();
login.render();
footer.render();

export const handleEvent = function(event) {
  const { name, value } = event.target;
  switch (name) {
    case 'home':
      home.render();
      break;
    case 'products':
      const selectedCategory = value;
      products.render(selectedCategory, addedToCart, navBar);
      break;
    case 'cart':
      cart.render(addedToCart, navBar);
      break;
    case 'buy':
      addedToCart = value;
      break;
    case 'checkout':
      addedToCart = [];
      navBar.updateCart(0);
      products.checkout();
      break;
    default:
      break;
  }
};
