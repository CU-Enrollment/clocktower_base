document.addEventListener("DOMContentLoaded", function() {
    var codebox = document.querySelectorAll('code');
    codebox.forEach( box => {
        var button = document.createElement('button');
        button.classList.add('copy-code');
        button.setAttribute('data-status', 'copy');
        box.parentNode.prepend(button);
    })
    

    let copyCode = document.querySelectorAll('.copy-code');

    copyCode.forEach(item=> {
        item.addEventListener('click', function(){
            var codeText = item.parentNode.querySelector('code').textContent;
            navigator.clipboard.writeText(codeText);
            item.setAttribute('data-status', 'ready');

            setTimeout(function() {
                item.setAttribute('data-status', 'copy');

            },2500 )
        })
    });

});

