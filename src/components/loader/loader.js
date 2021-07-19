import './loader.scss';

export default class Loader {
    render() {
        const main = document.querySelector('main');
        main.innerHTML = `<div class="loader"></div>`;
    }
}