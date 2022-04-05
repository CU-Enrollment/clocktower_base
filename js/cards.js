// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {
    console.log("card flip");
    
    [...document.querySelectorAll('.card-flip')].forEach(function(item) {
        item.mouseover = function(event) {
            console.log("you hovered over me");
        }
    });


}, false);