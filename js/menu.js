// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {

    let enrollmentToggle = document.querySelector('#enrollment-toggle'); // Menu Toggle Button
    const mainNav = "main-navigation" // Find the Main Navigation nav
    const mobileNav = "mobile-menu"; // Find the Mobile Nav
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    enrollmentToggle.onclick = function(){
        enrollmentToggle.classList.toggle('active');
        document.getElementById('enrollment-menu').querySelector('ul').classList.toggle('active');
    }

    mobileToggle.onclick = function(){
        mobileToggle.classList.toggle('active');
        document.querySelector('#mobile-menu').classList.toggle('active');
    }

    let menuLevels = function(x) {
        let m = document.getElementById(x)
        let primary = m.querySelector('ul'); // Find the first (top-level) navigation UL
        let topLevel = primary.querySelectorAll('li');
        let menu = m.getElementsByClassName('menu-item'); // Find the LIs in the top Main Navigation Nav

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
    }

    menuLevels(mainNav);
    menuLevels(mobileNav);

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
                    // 1ve to the left for top level links
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

                            if (parentElement.classList.contains('parent') && (currentElement.tagName == "BUTTON")) {
                                parentList.parentNode.classList.remove('active');
                                break;
                            }
                            if ( !(parentElement.classList.contains('parent'))) {
                                parentList.parentNode.classList.remove('active');

                                if (parentList.parentNode.nextElementSibling == null) {
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
        console.log("toggle hee hee");

        // Toggle top level
        if ( (toggle.parentNode.classList.contains('top-level') && !(toggle.parentNode.classList.contains('active')))) {
            console.log("I'm top shelf, and I was closed but now I will open");
            toggle.parentNode.classList.add("active");

            // I LEFT OFF ON STYLING THE SUB MENUS TO BE TO THE RIGHT AND HOW TO TOGGLE THROUGH THEM
            return;
        }
        // If the parent node already has an active state, close it. 
        if (toggle.parentNode.classList.contains('active', 'top-level')) {
            console.log("I should be taken out");
            toggle.parentNode.classList.remove('active');
            return;
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




    // Mobile Menu
    // Create the nav panel IDs to reference each other on mobile
    createPanelIds = function(x, y) {
         // create nav-panel id relationships
         // Create Nav Panel Relationships
         let navItems = x.querySelectorAll(':scope > ul > li');

         for (var i = 0; i < navItems.length; i++) {
            if (y) {
                panelID = (y) + '-' + (i + 1);
            }
            else {
                panelID = i + 1;
            }
            navItems[i].setAttribute('data-panel-id', panelID);
            
            if (y) {
                navItems[i].setAttribute('data-panel-parent', y);
            }
             
             if (navItems[i].classList.contains('parent')) {
                createPanelIds(navItems[i], panelID)
             };    
         };
    }

createMobile = function() {

    let currentMobile = document.querySelector('#' + mobileNav+ '> .menu'); // we will delete this at the end
    let mobileMenuList = document.getElementById('mobile-menu').querySelector('ul').querySelectorAll('li.menu-item');
    // let mobileMenuListLinks = document.getElementById('mobile-menu').querySelectorAll('ul li');

    createPanelIds(document.querySelector('#' + mobileNav));

    // Set generic nav panel
    const navPanel = document.createElement('div');
    navPanel.classList.add("nav-panel");
    navPanel.setAttribute('tabindex','-1');
    let panelDirection = 'hide-left';
    let activePanelID = ''; 

    // Generic Sub Menu 
    let subMenu = document.createElement('ul');

    // Generic Link Item
    let linkItem = document.createElement('li');


    // Going through the entire menu to look for links
    for (var i = 0; i < mobileMenuList.length; i++) {
        
        let panelLinks = mobileMenuList[i].querySelectorAll(':scope > .menu > .menu-item > a');
    
        if (mobileMenuList[i].classList.contains('parent') == true) {
                        
            let parentHeader = mobileMenuList[i].parentElement.closest('.parent');
            let panelHeader = ''
            let panelBreadcrumb = ''
            let expandButton = document.createElement('button');
            let panelID = mobileMenuList[i].getAttribute('data-panel-id');
            let parentID = mobileMenuList[i].getAttribute('data-panel-parent');
            // Create Panel
            let panel = navPanel.cloneNode(true);
            panel.classList.add('nav-panel-' + [i]);
            panel.setAttribute('id', 'nav-panel-' + panelID)
            panel.setAttribute('data-panel-id', panelID)


            panelSubMenu = subMenu.cloneNode(true);
            panelSubMenu.classList.add('menu', 'list-menu', 'links');

            // console.log(panelLinks[i])
        
            // Figure out panel breadcrumb
            if (parentHeader != null) {
                parentHeader = parentHeader.firstElementChild.innerHTML; 
                panelBreadcrumb =  "<button class='menu-breadcrumb' aria-label='Up one menu' data-panel-target='" + parentID + "'>" + parentHeader + "</button>"
            }

            // Panel Header if the panel header is a link
            if (mobileMenuList[i].firstElementChild.matches('a')) {
                let panelHeaderURL = mobileMenuList[i].firstElementChild.matches('a');
                panelHeader = mobileMenuList[i].querySelector('a').innerHTML;
                panelHeader = "<a href='" + panelHeaderURL + "' class='nav-panel-header'><h2> " + panelHeader + "</h2></a>"
            } 

            // If it isn't a link
            else {
                panelHeader = mobileMenuList[i].querySelector('span').innerText;
                panelHeader = "<h2>"  + panelHeader + "</h2>"
            }


            // Generate Links
            for (var j = 0; j < panelLinks.length; j++) {

                let navPanelLink = linkItem.cloneNode(true);
                navPanelLink.append(panelLinks[j].cloneNode(true));
                let navPanelExpand = expandButton.cloneNode(true);
                navPanelExpand.classList.add('toggle-menu');
            

                // if ( panelLinks[j].classList.contains('is-active')) {
                //     console.log("FOUND IT");
                //     let activePanelID = panelLinks[j].parentElement.getAttribute('data-panel-id');
                //     panelDirection = 'hide-right';
                // }

                let panelTarget = panelLinks[j].parentElement.getAttribute('data-panel-id');
                
                if (panelTarget) {
                    navPanelExpand.setAttribute('data-panel-target', panelTarget);
                    navPanelExpand.setAttribute('aria-haspopup', true)
                    navPanelExpand.innerHTML = '<span class="sr-only">Show ' + panelLinks[j].innerText + ' Panel</span>'
                }
                
                if (panelLinks[j].parentElement.classList.contains('parent')) {
                    navPanelLink.classList.add('parent');
                    subMenu.classList.add('sub-menu');
                    navPanelLink.append(navPanelExpand)
                    
                }

                // navPanelLink.append(panelLinks[j]);
                panelSubMenu.append(navPanelLink);

                panel.classList.add(panelDirection);

                if ( panelLinks[j].classList.contains('is-active')) {
                    activePanelID = panelLinks[j].parentElement.getAttribute('data-panel-id');
                }
            }

                if (activePanelID.length != '') {
                    panelDirection = 'hide-right';
                    
                }

                panel.innerHTML = "<div class='panel-wrap' style='display:none;'>" + 
                    panelBreadcrumb + 
                    panelHeader + 
                    panelSubMenu.outerHTML + '</div>';
                
                document.getElementById(mobileNav).append(panel);
            }

            
                                    
        }

        // setting the navpanel that is at the current level 

        let activePanel = document.getElementById('nav-panel-' + activePanelID)
        activePanel.classList.remove('hide-left', 'hide-right');
        activePanel.querySelector('.panel-wrap').style.display = 'block';
       
        currentMobile.remove(); // Delete original mobile menu as it is not needed anymore
}

createMobile();

 // Toggle on click of expander buttons
 [...document.querySelectorAll('.toggle-menu')].forEach(function(toggle) {
    // this.parentNode.classList.toggle("active");
   toggle.addEventListener('click', function() {
        toggleMenu(toggle);
   });
});

// Mobile Toggle Functionality

[...document.querySelectorAll('#mobile-menu button')].forEach(function(toggle) {
    console.log("There is a mobile menu toggle");

    toggle.addEventListener('click', function() {
        let currentPanel = toggle.closest('.nav-panel');
        let target = toggle.getAttribute('data-panel-target');
        let targetPanel = document.querySelector('.nav-panel[data-panel-id="' + target + '"]');
        let hideDirection = 'hide-left'
        
        if (toggle.classList.contains('menu-breadcrumb')) {
            hideDirection = 'hide-right'
            
        }
        currentPanel.classList.add(hideDirection);
        targetPanel.classList.remove('hide-left', 'hide-right');


        // hide and show panels
        targetPanel.querySelector('.panel-wrap').style.display = 'block';

    
        setTimeout(() => { 
            currentPanel.querySelector('.panel-wrap').style.display = 'none';
        }, 500);
        // targetPanel.focus();


    })

    // Mobile Escape
    document.getElementById('mobile-menu').onkeyup = function() {
        switch(event.keyCode) {     
            case 27:
                // if it is escape, close the menu 
                document.getElementById('mobile-menu').classList.remove('active');
                document.getElementById('mobile-toggle').classList.remove('active')
                document.getElementById('mobile-toggle').focus();
                break;
            }
    }

});

}, false);