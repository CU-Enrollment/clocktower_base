// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {

    let cards = [...document.getElementsByClassName('card-flip')];

    console.log("cards are: " + cards.outerHTML);
    console.log("card flip");

    function cardFlip() {
        card = event.target;
        
        if (!card.classList.contains('card-flip')) {
            card = card.closest('div.card-flip');
        }

        card.classList.toggle('active');
        console.log("You clicked me hee hee");
    }

    for (let i = 0; i < cards.length; i++) {
       cards[i].addEventListener('click', cardFlip);
    }; 

    
    
}, false);