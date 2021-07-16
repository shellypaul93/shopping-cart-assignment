import './modal.scss';
import { handleEvent } from '../../index.js';

class Modal {
  render() {
    const modalTemplate = `
    <div id="myModal" class="modal">
    <div class="modal-content" role="dialog"
    aria-labelledby="modal-title"
    aria-modal="true">
        <main>
            <span class="close">&times;</span>
            <div></div>
        </main>
    </div>
    </div>`;
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeEnd', modalTemplate);
    
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("cart");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
      modal.style.display = "block";
      modal.tabIndex = 1;
      handleEvent({ target: { name: 'cart' } });
    };
    span.onclick = function() {
      modal.style.display = "none";
      modal.tabIndex = -1;
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        modal.tabIndex = -1 ;
      }
    };
  }
}

export default Modal;