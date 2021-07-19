import Warning from '../../static/warning.svg';

export const validatePassword = (password) => {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regex.test(password)) {
        return false;
    }
    return true;
}

export const matchPasswords = (password, confirmPassword) => password === confirmPassword;

export const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export const errorInput = (input, errorMessage) => {
    input.style.borderWidth = '2px';
    input.style.borderColor = 'maroon';
    const span = input.nextElementSibling;
    errorSpan(span, errorMessage);
}

export const errorSpan = (span, errorMessage) => {
    span.innerHTML = `<embed tabIndex="-1" src='${Warning}'/> ${errorMessage}`;
    span.style.color = 'maroon';
    span.style.fontSize = '0.8em';
}

export const validInput = (input) => {
    input.style.borderWidth = '0px';
    input.style.borderColor = '#fff';
    const span = input.nextElementSibling;
    validSpan(span);
}

export const validSpan = (span) => {
    span.innerText = '';
    span.style.color = '#fff';
    span.style.fontSize = '0em';
}