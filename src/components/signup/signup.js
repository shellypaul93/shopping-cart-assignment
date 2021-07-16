import textInput from "../common/textInput";
import './signup.scss';
import Toast from "../toast/toast";
import { isBlank } from "../../utils/utils";
import { validatePassword, validateEmail, matchPasswords,
    errorSpan, validSpan, validInput, errorInput } from "../../utils/validator";
import SignIn from "../signin/signin";

class Signup {
    render() {
        const signupTemplate = `
        <section id='userSession' class='flex'>
            <div>
                <h3><strong>Signup</strong></h3>
                <p>We do not share your personal details with anyone.</p>
            </div>
            <div id='registerForm'>
                <form>
                    ${textInput("First Name")}
                    ${textInput("Last Name")}
                    ${textInput("Email")}
                    ${textInput("Password")}
                    ${textInput("Confirm Password")}
                    <span id='formErrors'></span>
                    <button class='primary' type='submit'>Sign Up</button>
                </form>
            </div>
        </section>`;
    
    const main = document.querySelector('main');
    main.innerHTML = signupTemplate;

    const inputs = document.getElementsByTagName('input');
    Object.values(inputs).forEach(input => {
        input.onblur = (event) => {
            const input = event.target;
            if (isBlank(input.value.trim())) {
                errorInput(input, 'Field value is required.');
                return;
            } else if (input.type === 'password' && !validatePassword(input.value.trim())) {
                errorInput(input, 'Entered password must be atleast 6 characters,'
                + 'it must have a number and alphabet and it cannot contain any spaces.')
                return;
            } else if (input.id === 'email' && !validateEmail(input.value.trim())) {
                errorInput(input, 'Email address is not in a valid format.')
                return;
            } else {
                validInput(input);
            }
        }
     });

    document.querySelector('#registerForm form').onsubmit = function(event) {
        event.preventDefault();
        const password = document.querySelector('input#password').value.trim();
        const rePassword = document.querySelector('input#confirmPassword').value.trim()
        const span = document.getElementById('formErrors');
        if (!matchPasswords(password, rePassword)) {
            errorSpan(span, 'Entered passwords do not match!');
            return;
        } else {
            validSpan(span);
        }
        let name = document.querySelector('input#firstName').value;
        name = name.charAt(0).toUpperCase().concat(name.slice(1, name.length));
        new Toast().render(`${name}, You have successfully registered with us!`);
        new SignIn().render();
    }
    }
}

export default Signup;