import './toast.scss';

class Toast {
    
    render(responseType) {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.remove();
        }
        const message = responseType === 'success' 
            ? 'Product added to cart successfully!' 
            : (responseType === 'failure'
                ? 'Oops! Something went wrong!'
                : responseType);
                
        const toastTemplate = `<div id="toast">${message}</div>`;
        const body = document.getElementsByTagName("body")[0];
        body.insertAdjacentHTML('afterBegin', toastTemplate);
        setTimeout(() => {
            if (document.getElementById("toast")) {
                document.getElementById("toast").remove();
            }
        }, 3000)
    }
}

export default Toast;