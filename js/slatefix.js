const inputs = 'select, input:not([type=hidden]), textarea ';
let x = 0;

(function wait() {
    if (x < 5) {
        if ( document.querySelector('.form_address') != null) {
            let formInputs = document.querySelector('.form_address').querySelectorAll(inputs);
            formInputs.forEach(input => {
                var label = input.parentElement.parentElement.querySelector('label');
                label.innerText = label.innerText + '*';
            })
        } else {
            x++;   
            setTimeout( wait, 500 );
        }
    }
})();