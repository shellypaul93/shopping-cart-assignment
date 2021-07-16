import './footer.scss';

class Footer {
    render() {
        const main = document.querySelector('main');
        const footerTemplate = `
        <footer id='app'>
            <p>Copyright @ 2011-2018 Sabka Bazaar Grocery Supplies Pvt Ltd</p>
        </footer>`
        main.insertAdjacentHTML('afterEnd', footerTemplate);
    }
}

export default Footer;