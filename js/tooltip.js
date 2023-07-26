document.addEventListener("DOMContentLoaded", function() {

    var tooltips = document.querySelectorAll('.tooltip-trigger');
    
    if (tooltips != "null") {
        
        tooltips.forEach(tip => {
            var toolwrap = tip.parentNode;
            var tooltip = tip.parentNode.querySelector('.tooltip');

            var close = document.createElement('button');
            close.classList.add('close-tooltip');
            
            tooltip.append(close);
            var timer;
    
            tip.setAttribute('tabindex', '0');
    
            close.addEventListener('click', function() {
                closeTip(tooltip);
                toolwrap.focus();
            });
    
            toolwrap.onmouseover = function(){
                clearTimeout(timer);
                showTip(tooltip);
            };
    
            toolwrap.onmouseleave = function() {
                timer = setTimeout(function() {
    
                    closeTip(tooltip);
                }, 50);
            }
    
            tip.addEventListener('click', function() {
                showTip(tooltip);
            });
            
            // CLose the tooltip if escape is used
            tip.onkeyup = function(event) {
                switch(event.keyCode) {     
                    case 13:
                        // if it is escape, close the menu 
                        showTip(tooltip);
                        break;
                }
            }
    
            toolwrap.onkeyup = function(event) {
                switch(event.keyCode) {     
                    case 27:
                        // if it is escape, close the menu 
                        closeTip(tooltip);
                        tip.focus();
                        break;
                }
            }
    
        });
    
        function showTip(tooltip) {
            tooltip.classList.add('active');
        }
    
        function closeTip(tooltip) {
            tooltip.classList.remove('active');
        }
    }
});