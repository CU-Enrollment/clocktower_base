// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {

    let menutoggle = document.querySelector('.menu-toggle'); // Menu Toggle Button
    const nav = document.getElementById('main-navigation'); // Find the Main Navigation nav
    const primary = nav.querySelector('ul'); // Find the first (top-level) navigation UL
    const topLevel = primary.querySelectorAll('li');
    const menu = nav.getElementsByClassName('menu-item'); // Find the LIs in the top Main Navigation Nav


    menutoggle.onclick = function(){
        menutoggle.classList.toggle('active');
    }

    

    // menu.classList += "";

    // Find Top Level menu items
    for (var i = 0; i < topLevel.length; i++){
        if (topLevel[i].parentNode == primary) {
            topLevel[i].classList.add("top-level");
        }
    }

    // Find menu items with children, then add a expandable button to them
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].classList.contains('menu-item--expanded')) {
            menu[i].classList.add("parent");
            
            menu[i].querySelector('.list-menu').classList.add('sub-menu');
            // menu[i].querySelector('.sub-menu').querySelector('.list-menu').classList += ' sub-sub';
            // Create expander buttons
            let btn = document.createElement("button");
            let btnText = menu[i].firstElementChild.innerHTML; // Need the text of the link to add to the button later
            btn.setAttribute("aria-expanded","false"); // Aria-expanded for A11y purposes
            btn.setAttribute("aria-hidden", "true")
            btn.innerHTML = "<span class='sr-only'>Expand " + btnText + "</span>"; // Hidden span to explain what the button does 
            btn.classList.add("toggle-menu"); // Add toggle menu class
            menu[i].insertBefore(btn, menu[i].querySelector('ul')); // Append the button after the anchor tag, but before the nested UL
        }
    }

    // Toggle on click of expander buttons
    [...document.querySelectorAll('.toggle-menu')].forEach(function(toggle) {
        
        
        // this.parentNode.classList.toggle("active");
       toggle.addEventListener('click', function() {
            toggleMenu(toggle);
       });
    });

    [...document.querySelectorAll('.top-level')].forEach(function(item) {
        item.onkeyup = function(event) {
            event.preventDefault();
            let topLevel = item.querySelector('a');
            let nextTopLevel = "";
            let prevTopLevel = "";
            let currentElement = document.activeElement;
            let parentElement = document.activeElement.parentNode;
            let parentList = parentElement.parentNode.parentNode;
            
            // need to check if top level is first/last child
           
             // need to check if top level is first/last child 
            if (item.previousElementSibling == null) {
                prevTopLevel = item.parentNode.lastElementChild.querySelector('a');
            }
            else {
                prevTopLevel = item.previousElementSibling.querySelector('a');

            }
            if (item.nextElementSibling == null) {
                nextTopLevel = item.parentNode.firstElementChild.querySelector('a');
            }
            else {
                nextTopLevel = item.nextElementSibling.querySelector('a');

            }

            switch(event.keyCode) {     
                case 27:
                    // if it is escape, close the menu 
                    closeAllActive();
                    topLevel.focus();
                    break;
                case 37:
                    // Move to the left for top level links
                    if (parentElement.classList.contains('top-level')) {
                        prevTopLevel.focus();
                        closeAllActive();
                        break;
                    }

                    // if the first sub-menu, then it goes to the previous top-level
                    if (parentList.classList.contains('top-level')) {
                        closeAllActive();
                        prevTopLevel.focus();
                    }
                    // if in submenu, and need to move up out of submenu
                    if (parentList.parentNode.classList.contains('sub-menu')) {
                        
                        // Come out of sub-menu, into another sub-menu
                        if (parentList.classList.contains('parent')) {
                            parentList.classList.remove('active');
                            parentList.querySelector('a').focus();
                            break;
                        }
                    }

                    break;
                case 38:

                    // If it is top row, now reason to go 'up'
                    if (parentElement.classList.contains('top-level')) {
                        break;
                    }
                    // if there is a previous item to go to, go to it.
                    if(parentElement.previousElementSibling != null){
                        parentElement.previousElementSibling.querySelector('a').focus();
                        break;
                    }
                    if ( (parentElement.previousElementSibling == null) && !(parentList.classList.contains('top-level')) ){
                        parentElement.parentNode.lastElementChild.querySelector('a').focus();
                        break;
                    }
                    // If it is in the sub-menu, loop through the sub-menu
                    if( parentList.classList.contains('top-level') ) {
                        parentList.classList.remove('active');
                        topLevel.focus();
                    }
                    break;
                case 39:
                    // Right Arrow
                    // Move to the Right for top level links
                    if (parentElement.classList.contains('top-level') && (parentElement.nextElementSibling != null)) {
                        nextTopLevel.focus();
                        break;
                    }
                   

                    // if in sub-menu, and has another sub-menu it shouldn't do anything
                    if ( (parentElement.classList.contains('parent')) && (parentElement.querySelector('ul') != null)) {
                        toggleMenu(parentElement.querySelector('button'));
                        break;

                    }

                    if ( !(parentElement.classList.contains('parent')) ){
                        document.querySelectorAll('.active').forEach(function(item) {
                            item.classList.remove('active');
                        });
                        nextTopLevel.focus();
                    }
                    
                    break;

                case 40:
                   
                    // Top level into accordion
                    if ( (parentElement.classList.contains('top-level') && parentElement.classList.contains('parent') )) {
                        toggleMenu(parentElement.querySelector('button'));
                        var nextAccordion = currentElement.nextElementSibling.nextElementSibling;
                        nextAccordion.querySelector('a').focus();
                        break;
                    }

                    // Sublevel Down arrow as long as there is a place to go to 
                    if ( (parentElement.nextElementSibling != null) && (parentElement.parentNode.classList.contains('sub-menu'))) {
                        parentElement.nextElementSibling.querySelector('a').focus();
                        break;
                    }

                    // if at bottom of current list, go back to the top
                    if ( (parentElement.lastChild)) {
                        parentList.querySelector('li').querySelector('a').focus();
                    }
            };
        };

        // Make tabbing still work
        item.onkeydown = function(event) {
           
            let currentElement = event.target;
            let parentElement = currentElement.parentNode;
            let parentList = currentElement.parentNode.parentNode;
            
            switch(event.keyCode) {     
                case 9:
                    if(event.shiftKey) {
                      
                        if ( (parentElement.previousElementSibling == null) && (currentElement.previousElementSibling == null)) {
                            parentList.parentNode.classList.remove('active');
                            break;
                        }
                        
                    }
                    else {
                        if (parentElement.nextElementSibling == null) {
                            console.log("We know the parent doesn't have a sibling");
                            console.log(parentElement.parentNode);

                            if (parentElement.classList.contains('parent') && (currentElement.tagName == "BUTTON")) {
                                console.log("we know the it's a submenu, and that we were on a button")
                                parentList.parentNode.classList.remove('active');
                                break;
                            }
                            if ( !(parentElement.classList.contains('parent'))) {
                                parentList.parentNode.classList.remove('active');

                                if (parentList.parentNode.nextElementSibling == null) {
                                    console.log("null null null");
                                    parentList.parentNode.parentNode.classList.remove('active');
                                    parentList.parentNode.parentNode.parentNode.classList.remove('active');

                                    break;
                                }
                                break;

                            }
                        }
                    }
            }
        }


    });

    // Take off all active classes, shut it all down!
    function closeAllActive() {
        document.querySelectorAll('.active').forEach(function(item) {
            item.classList.remove('active');
        });
    }
    //close only the current menu that was left open
    function closeMenu() {
        let currentOpen = document.querySelector('.active')
        if (currentOpen !== null) {
            currentOpen.classList.remove('active');
        }

    }

    function toggleMenu(toggle) {
        

        let currentOpen = document.querySelector('.top-level.active')
        
        // Toggle top level
        if ( (toggle.parentNode.classList.contains('top-level') && !(toggle.parentNode.classList.contains('active')))) {
            toggle.parentNode.classList.add("active");

            // I LEFT OFF ON STYLING THE SUB MENUS TO BE TO THE RIGHT AND HOW TO TOGGLE THROUGH THEM
            return;
        }
        // If the parent node already has an active state, close it. 
        if (toggle.parentNode.classList.contains('active') && toggle.parentNode.classList.contains('top-level')) {
            toggle.parentNode.classList.remove('active');
        }
        
        // There is a Top-Level Active, but we are doing sub-menu active tree
        if ( !(toggle.parentNode.classList.contains('top-level')) && (currentOpen !== null) && (toggle.parentNode.classList.contains('parent'))){
            let nextAccordion = toggle.parentNode.querySelector('ul');
            toggle.parentNode.classList.add('active');
            nextAccordion.querySelector('a').focus();
        }
        // Check to see if Active State is on any other items, and if it is, remove it
        else if (currentOpen !== null) {
            // Check if it is in a sub-menu, because if it is it needs to go over and not close
            if ( !(toggle.parentNode.classList.contains('top-level')) ) {
                let nextSubMenu = toggle.parentNode.querySelector("ul").querySelector("ul");
                nextSubMenu.classList.add('active');

            }
            else {
                currentOpen.classList.toggle("active");
                toggle.parentNode.classList.add("active");
            }
        }
        
        // Otherwise it isn't open, and so we add active to this
        else {
            toggle.parentNode.classList.toggle('active');
        }

        // expand this one
    }
  }, false);

  