// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {

    var timer;

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]';
    
    let flipCards = document.querySelectorAll('.flip-card');



    flipCards.forEach(card => {

        var focusableContent = card.querySelector('.card__face--back').querySelectorAll(focusableElements);

        var openCard = card.querySelector('.fc-open');
        var closeCard = card.querySelector('.fc-close');
        var cardBack = card.querySelector('.card__face--back');

        cardBack.setAttribute('aria-hidden', 'true');

        focusableContent.forEach(item => {
            item.setAttribute('tabindex', '-1');
        });


        openCard.addEventListener('click', function(e){
            card.querySelector('.card-content--desktop').classList.add('active');
            cardBack.setAttribute('aria-hidden', 'false');

            focusableContent.forEach(item => {
                item.setAttribute('tabindex', '0');
            });
            openCard.setAttribute('tabindex', '-1');
            closeCard.focus();


        });

        closeCard.addEventListener('click', function() {
            console.log("I WANNA CLOSE");
            card.querySelector('.card-content--desktop').classList.remove('active');
            cardBack.setAttribute('aria-hidden', 'true');

            focusableContent.forEach(item => {
                item.setAttribute('tabindex', '-1');
            });
            openCard.setAttribute('tabindex', '0')
            openCard.focus();
        });

        cardBack.onkeydown = function(e){

            let focusableContent = cardBack.querySelectorAll(focusableElements);

            let firstFocusableElement =focusableContent[0];
            let lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            switch(e.keyCode) {     
                // case 9: 
                //     if (firstFocusableElement === lastFocusableElement) {
                //         e.preventDefault();
                //         break;
                //     }
                //     else {
                //         if (e.shiftKey) {
                //             if (document.activeElement === firstFocusableElement) {
                //                 lastFocusableElement.focus();
                //                 e.preventDefault();
                //                 break;
                //             }
                //             break;
                //         }
                //         else {
                //             if (document.activeElement === lastFocusableElement) {
                //                 firstFocusableElement.focus();
                //                 e.preventDefault();
                //                 break;
                //             }
                //             break; 
                //         }
                //     }
                case 27:
                    // if it is escape, close the menu 
                    card.querySelector('.card-content').classList.remove('active');
                    cardBack.setAttribute('aria-hidden', 'true');

                    focusableContent.forEach(item => {
                        item.setAttribute('tabindex', '-1');
                    });
                    openCard.focus();

                    e.preventDefault();
                    break;
                   
            }
                   
        };
        
    });

    // Take tabindex off at mobile view

   
    
}, false);