import './signin.scss';
import { errorSpan, validInput, errorInput } from "../../utils/validator";
import Toast from "../toast/toast";
import { isBlank } from "../../utils/utils";
import textInput from "../common/textInput";
import { handleEvent } from "../..";

class SignIn {
    render() {
        const loginTemplate = `
        <section id='userSession' class='flex'>
            <div>
                <h3><strong>Login</strong></h3>
                <p>Get access to your Orders, Wishlist and Recommendations.</p>
            </div>
            <div id='registerForm'>
                <form>
                    ${textInput("Email")}
                    ${textInput("Password")}
                    <span id='formErrors'></span>
                    <button class='primary' type='submit'>Login</button>
                </form>
            </div>
        </section>`;
    
    const main = document.querySelector('main');
    main.innerHTML = loginTemplate;

    const inputs = document.getElementsByTagName('input');
    Object.values(inputs).forEach(input => {
        input.onblur = (event) => {
            const input = event.target;
            if (isBlank(input.value.trim())) {
                errorInput(input, 'Field value is required.');
                return;
            } else {
                validInput(input);
            }
        }
     });

    document.querySelector('#registerForm form').onsubmit = function(event) {
        event.preventDefault();
        const password = document.querySelector('input#password').value.trim();
        const span = document.getElementById('formErrors');
        const email = document.querySelector('input#email').value.trim();
        if ((email === 'test@test.com' &&
                password !== 'admin@1') || email !== 'test@test.com') {
            new Toast().render('Login failed. \n Invalid login crendentials.');
            errorSpan(span, 'Login failed. \n Invalid login crendentials.');
            return; 
        } else {
            new Toast().render(`Welcome to Sabka Bazaar !`);
            window.sessionStorage.setItem("user", email);
            document.querySelector('.login').innerText = 
                window.sessionStorage.getItem("user") ? 'Sign Out' : 'Sign In';
            handleEvent({ target: { name: 'home' }});
        }
    }
    }
}

export default SignIn;