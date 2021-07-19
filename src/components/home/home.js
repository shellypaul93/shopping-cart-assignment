import { fetchData, sortCategories, scrollToTop } from '../../utils/utils';
import Carousel from '../carousel/carousel';
import './home.scss';
import { handleEvent } from '../../index';
import Toast from '../toast/toast';
import Loader from '../loader/loader';

class Home {
  constructor() {
    this.carousel = new Carousel;
    this.offers = [];
    this.categories = [];
  }

  async render() {
    scrollToTop();
    try {
      if (this.offers.length === 0 || this.categories.length === 0) {
        new Loader().render();
      }
       if (this.offers.length === 0) {
        this.offers = await fetchData('banners');
      }
      if (this.categories.length === 0) {
        this.categories = await fetchData('categories');
        this.categories = await sortCategories(this.categories);
      }
    } catch (error) {
      new Toast().render('failure');
    }
    
    this.carousel.render(this.offers);
    const categoriesTemplate = `<hr id='divider'/><br/>${this.categories.map((category, index) => {
    const even = index%2 === 0;
      return `<div class='briefCategory'>
        ${even === true
        ? (`<img src='${category.imageUrl}' alt='${category.description}' />
        <div>
          <h6><strong>${category.name}</strong></h6>
          <p>${category.description}</p>
          <button class='primary' id='${category.name}'>Explore ${category.key}</button>
        </div>`)
      : (`<div>
          <h6><strong>${category.name}</strong></h6>
          <p>${category.description}</p>
          <button class='primary' id='${category.name}'>Explore ${category.key}</button>
        </div>
        <img src='${category.imageUrl}' alt='${category.description}' />`)} 
      </div><br/><hr id='divider'/><br/>`
    }).join('')}`;
    const carousel = document.getElementById('carouselIndicators');
    carousel.insertAdjacentHTML('afterEnd', categoriesTemplate);
    
    document.querySelectorAll('.briefCategory button').forEach(
      element => {
        element.addEventListener('click', function(event) {
          const categoryName = event.target.id;
          handleEvent({ target: { name: 'products', value: categoryName } });
        })}
    );
  }
}

export default Home;
