import Logo from '../../../static/images/logo.png';
import Logo2x from '../../../static/images/logo_2x.png';
import Cart from '../../../static/images/cart.svg';
import { handleEvent } from '../../index';
import './navBar.scss';
import SignIn from '../signin/signin';
import Signup from '../signup/signup';
import { detectMobile } from '../../utils/utils';
import Modal from '../modal/modal';

class NavBar {
  render() {
    const main = document.querySelector('main');
    const navBarTemplate = `
    <header>
      <nav class='flex'>
        <picture role='button' tabindex='0' id="brandLogo">
          <source media="(min-width: 768px)" class='homeLink' srcset=${Logo2x}>
          <img class='homeLink' src=${Logo} alt='Home page' style="width:70%;">
        </picture>
        <section>
          <div class='userSession'>
              <ul>
              <li class='login'><a href='#'><strong>
                ${window.sessionStorage.getItem("user") ?? false
                ? 'Sign Out'
                : 'Sign In'}
                </strong></a></li>
              <li class='register'><a href='#'><strong>Register</strong></a></li>
            </ul>
          </div>
          <div class='app-header'>
            <ul>
              <li class='homeLink'><a href='#'><strong>Home</strong></a></li>
              <li class='productsLink'><a href='#'><strong>Products</strong></a></li>
              <li><button id='cart'>
                <img src=${Cart} alt='Your cart has 0 number of items' />
                <p>0 items</p>
              </button></li>
            </ul>
          </div>
        </section>
      </nav>
      <hr />
    </header>`;
    main.insertAdjacentHTML('beforeBegin', navBarTemplate);

    document.querySelectorAll('.homeLink').forEach(
      element =>
        (element.onclick = function() {
          event.preventDefault();
          history.pushState({urlPath:'/home'},"",'/home')
          handleEvent({ target: { name: 'home' } });
        })
    );
    
    document.querySelector('.login').onclick = function() {
      if (window.sessionStorage.getItem("user") ?? true) {
        document.querySelector('.login a strong').innerText = 'Sign In';
        window.sessionStorage.setItem("user", undefined);
      } else {
        document.querySelector('.login a strong').innerText = 'Sign Out';
      }
      event.preventDefault();
      history.pushState({urlPath:'/'},"",'/')
      new SignIn().render();
    };

    document.querySelector('.register').onclick = function() {
      event.preventDefault();
      history.pushState({urlPath:'/register'},"",'/register')
      new Signup().render();
    };

    document.getElementsByClassName('productsLink')[0].onclick = function(event) {
      event.preventDefault();
      history.pushState({urlPath:'/products'},"",'/products')
      handleEvent({ target: { name: 'products' } });
    };
    
    if (!detectMobile()) {
      new Modal().render();
    } else {
      document.getElementById('cart').onclick = function() {
        handleEvent({ target: { name: 'cart' } });
      };
    }
  }

  updateCart(numOfItems) {
    document.querySelector('#cart img').alt = `Your cart has ${numOfItems} number of items`;
    document.querySelector('#cart p').innerText = `${numOfItems} items`;
  }
}

export default NavBar;
