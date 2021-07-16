const textInput = (label) => {

    const name = label.charAt(0).toLowerCase().concat(label.slice(1, label.length).replace(/ /g,""));
    const inputType = label.toLowerCase().includes('password') ? 'password' : 'text';
    const textInputTemplate = `
        <div class='field'>
            <label for='${name}'>${label}
                <input id='${name}' type='${inputType}' name='${name}' required /> 
                <span></span>
            </label>
        </div>
    `;

    return textInputTemplate;
}

export default textInput;