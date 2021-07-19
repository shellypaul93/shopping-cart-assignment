export const findProduct = (products, productId) =>
  products.find(product => product.id === productId);

export const checkProductInCart = (addedToCart, productId) =>
  addedToCart.find(addedItem => {
    return addedItem.id === productId;
  })
    ? true
    : false;

export const sortCategories = (categories) =>
  categories.filter((category) => category.enabled === true)
            .sort((a,b) => a.order - b.order);

export const detectMobile = () => {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

export const fetchData = async (module) => {
  const response = await fetch(`http://localhost:5000/${module}`);
  const data = await response.json();
  return data;
}

export const postData = async (module, body) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(body)
  };
  const response = await fetch(`http://localhost:5000/${module}`, opts);
  const data = await response.json();
  return data;
}

export const saveProducts = (products) => {
  let savedProducts = [...products];
  return function getProducts() {
    return savedProducts;
  }
}

export const cartRenderLocation = () => detectMobile() 
? 'main'
: '.modal-content main div';

export const filterCart = (cartItems) => cartItems.filter((item) => item.count > 0);

export const isBlank = (value) => value === "" || value === undefined || value.length === 0;

export const getCurrentPath = () => {
  let location = window.location.href;
  location = location.split('/')
  return location[location.length-1];
}

export const getTotalCartItems = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.count
  });
  return total;
}

export const getDevice = () => {
  let width = window.innerWidth;
  if (width < 767) {
    return "mobile";
  } else if (width >= 768 && width <= 1024) {
    return "tablet";
  } else return "desktop";
}

export const scrollToTop = () => {
  window.scrollTo(0,0);
}