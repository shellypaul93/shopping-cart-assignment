import './carousel.scss';

class Carousel {
  render(offers) {
    const carouselTemplate = `<div id='carouselIndicators'
      class='carousel slide' data-bs-ride='carousel'>
      <div class='carousel-indicators'>
      ${offers.map((offer, index) =>
          `<button type='button' data-bs-target='#carouselIndicators' data-bs-slide-to='${index}'
        class='${index === 0 ? 'active' : ''}' aria-current='${index === 0 ? 'true' : ''}' 
        aria-label='${offer.bannerImageAlt}'>
        </button>`
        ).join('')}
    </div>
    <div class='carousel-inner'>
      ${offers.map((offer, index) =>
          `<div class='carousel-item${index === 0 ? ' active' : ''}'>
                <img src='${offer.bannerImageUrl}' alt='${offer.bannerImageAlt}'
                class='d-block w-100'></img>
            </div>`
        ).join('')}
    </div>
    <button class='carousel-control-prev' type='button'
      data-bs-target='#carouselIndicators'data-bs-slide='prev'>
      <span>PREV</span>
      <span class='visually-hidden'>Previous</span>
    </button>
    <button class='carousel-control-next' type='button'
      data-bs-target='#carouselIndicators'data-bs-slide='next'>
      <span>NEXT</span>
      <span class='visually-hidden'>Next</span>
    </button>
    </div>`
    const main = document.querySelector('main');
    main.innerHTML = carouselTemplate;
  }
}

export default Carousel;