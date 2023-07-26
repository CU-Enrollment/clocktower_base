// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation

// const { wrap } = require("lodash");

 
document.addEventListener('DOMContentLoaded', function () {
    let header = document.getElementById(('site-header'));

    const mainNav = "main-navigation" // Find the Main Navigation nav
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]';

    const navs = '#main-navigation, #utility-nav, #priority-navigation';
    // const navs = '#main-navigation, #utility-nav, #priority-navigation';

    function menuLevels(x) {
        let nav = document.querySelectorAll(navs)
        nav.forEach(nav => {
          
            if (nav) {
                let menuList = nav.querySelector('ul');
                levels(menuList);
            }

        });
    }

    
    menuLevels(mainNav) // broken out in case we ever need to do a separate menu

    function levels(list, x) {
        if (list != null) {

            // First time through x will be null
            if (x == null) {
                x = 0;
            }
            x = x + 1;
            sublist = list.querySelectorAll(':scope > li');
            
            sublist.forEach(item => {
                item.classList.add(`level-${x}`)
                let link = item.querySelector(':scope > *');
                
                // if (x == 2){
                //     item.classList.add('unit-level');
                //     item.querySelector('a').classList.add('unit-level');
                // }
    
                if (x == 2){
                    item.classList.add('unit-level');
                    item.querySelector('a').classList.add('unit-top-level');
                }
                
                if ( link != null && link.getAttribute('data-drupal-link-system-path') == '<front>' ) {
                    link.classList.add('active-site');
                }
    
    
                if ( link != null && link.classList.contains('unit-top-level' )) {
                    item.querySelector('ul').classList.add('site-level');
                    
                    let topLevel = item.querySelectorAll(':scope > ul > li');
    
                    topLevel.forEach(level => {
                        level.classList.add('top-level');
                        if(level.querySelector('ul') != null) {
    
                            level.querySelector('ul').classList.add('top-level-child');

                        }
                        expandedMenu = level.querySelectorAll('.top-level-child ul');
                        expandedMenu.forEach(x => {
                            x.classList.add('expanded-menu');
                        })

                    })
                }

                
    
                if ( item.classList.contains('menu-item--expanded')) {
                    item.classList.add('parent');
                }
                if (item.querySelector('ul') != null) {
                    nextList = item.querySelector('ul');
                    levels(nextList, x);
                }
                
                
            });
        }

        return;
    }

    // Create the nav panel IDs to reference each other on mobile
    
    createPanelIds = function(x, y) {
        // create nav-panel id relationships
        // Create Nav Panel Relationships
        let navItems = x.querySelectorAll(':scope > ul > li');

        for (var i = 0; i < navItems.length; i++) {

           if (y) {
               panelID = (y) + '-' + (i + 1);
               navItems[i].setAttribute('data-panel-parent', y);

           }
           else {
               panelID = i + 1;
           }


           if (navItems[i].classList.contains('parent')) {
               navItems[i].setAttribute('data-panel-id', panelID)
               createPanelIds(navItems[i], panelID)
           };    

           

        };
    }

    
createMenu = function(menu) {
    let currentMenu = menu.querySelector(':scope > .menu'); // we will delete this at the end    
    let menuList = currentMenu.querySelectorAll('ul.menu > .menu-item'); // Get all menu Items (LIs)

    let utilityNav = document.getElementById('utility-nav');
    // let currentMenu = document.getElementById('mobile-menu').querySelector('ul').querySelectorAll('li.menu-item');
    // let currentMenuLinks = document.getElementById(mainNav).querySelectorAll('ul li');

    createPanelIds(document.querySelector('#' + mainNav)); // Generate the panel ids in the links and li

    // Set generic nav panel
   
    const navWrap = document.createElement('div'); // This is the wrap that will also offer a backdrop to dim the body
    navWrap.classList.add('nav-wrap');

    // Menu Close Button
    let closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fa-light fa-xmark"></i><span class="sr-only">Close Menu</span>'
    closeButton.setAttribute('aria-expanded', 'true');
    closeButton.setAttribute('id', "main-menu-close");
    closeButton.classList.add('menu-close', 'toggle-button', 'toggle-close');

    navWrap.append(closeButton);



    document.getElementById(mainNav).append(navWrap);

    // First Menu panel will be above the current site, so default to left
   
    // let panelDirection = 'hide-left';
    let panelPosition = 'left-col';

    // Going through the entire menu to look for links
    // for (var i = 0; i < menuList.length; i++) {
    
    

    menuList.forEach((list, x) => {
        
        const navPanel = document.createElement('div'); // This is where the actual menu will go
        navPanel.classList.add("nav-panel", "hidden");
        navPanel.setAttribute('tabindex','-1');

        const panelWrap = document.createElement('div'); // This is the panel inside the wrap we will append items to
        panelWrap.classList.add('panel-wrap');
        // panelWrap.style.display = 'none';

        let currentClasses = list.classList;
        let panelSubMenu = document.createElement('ul'); // Generic Sub Menu
        // current = list.querySelectorAll('ul:not(.expanded-menu)');
        
        
        // Items that will give information to direct the panel switches later
        panelID = list.getAttribute('data-panel-id');
        parentID = list.getAttribute('data-panel-parent');
        panelHeader = '';
        
        panelHeader = document.createElement('h2');
        
        panelBreadcrumb = document.createElement('button')
        panelBreadcrumb.classList.add('toggle-menu', 'menu-breadcrumb');
        panelBreadcrumb.setAttribute('aria-label', 'Up one menu level')
        
        menuList = list.querySelectorAll(':scope > ul');

        // For each of the menu list groups, we are going to find out the links

        // Assigns a breadcrumb, unless there isn't a level up
        if (list.firstElementChild.matches('a')) {
            headerLink = list.querySelector('a').cloneNode(true);
            headerLink.classList.add('nav-panel-header');
            panelHeader.append(headerLink)
        } 

        // If it isn't a link
        else {
            panelHeader.append(list.firstElementChild.innerText)
        }
        
        if (list.querySelector('ul') != null && !(list.parentNode.classList.contains('top-level-child'))) {
            
            
            menuClone = list.querySelector(':scope > ul').cloneNode(true);
            // need to delete submenu, unless the current menu is a top-level-child

            menuListItems = menuClone.querySelectorAll(':scope > li');
            
            for (y = 0; y < menuListItems.length; y++) {
                
                if (menuListItems[y].classList.contains('top-level') || menuListItems[y].classList.contains('unit-level')) {   
                    let btn = document.createElement("button");
                    let btnText = menuListItems[y].querySelector(':scope > *').innerHTML; // Need the text of the link to add to the button later
                    
                    btn.setAttribute("aria-expanded","false"); // Aria-expanded for A11y purposes
                    btn.setAttribute("aria-haspopup", "true")
                    btn.innerHTML = btnText; // Hidden span to explain what the button does 
                    btn.classList.add("toggle-menu", 'top-level-toggle'); // Add toggle menu class
                    btn.setAttribute('data-panel-target', 'nav-panel-' + menuListItems[y].getAttribute('data-panel-id'));

                    menuListItems[y].append(btn);
                    menuListItems[y].querySelector(':scope > *').remove();
                }
                else {

                    let btn = document.createElement("button");
                        let btnText = menuListItems[y].firstElementChild.innerHTML; // Need the text of the link to add to the button later
                        btn.setAttribute("aria-expanded","false"); // Aria-expanded for A11y purposes
                        btn.setAttribute("aria-haspopup", "true")
                        btn.innerHTML = "<span class='sr-only'>Show " + btnText + " Panel </span>"; // Hidden span to explain what the button does 
                        btn.classList.add("toggle-menu"); // Add toggle menu class
                        btn.setAttribute('data-panel-target', 'nav-panel-' + menuListItems[y].getAttribute('data-panel-id'));
                        
                        
                        if (menuListItems[y].classList.contains('parent')) {
                            menuListItems[y].append(btn); // Append the button after the anchor tag, but before the nested UL
                        }
                }


                if ( menuListItems[y].querySelector(':scope > ul') != null) {
                    
                    if(menuListItems[y].querySelector(':scope > ul:not(.expanded-menu)')) {

                        menuListItems[y].querySelector(':scope > ul:not(.expanded-menu)').remove();
                    }
                    else {
                        menuListItems[y].querySelector('button').remove();
                    }
                }
            }
            
            parentHeader = list.parentElement.closest('.parent');
            
            breadcrumb = ''
            if (parentHeader != null) {
                breadcrumb = panelBreadcrumb.cloneNode(true);
                breadcrumb.innerText = parentHeader.firstElementChild.innerText;
                breadcrumb.setAttribute('data-panel-target', 'nav-panel-' + parentHeader.getAttribute('data-panel-id'));
            }
            if (list.classList.contains('unit-level')) {
                breadcrumb.classList.add('unit-breadcrumb');
            }
            let panel = navPanel.cloneNode(true); // Clone the NavPanel for new item
            wrap = panelWrap.cloneNode(true); // Clone the Nav Wrap for new item


            panel.classList.add('nav-panel-' + x);
            panel.setAttribute('id', 'nav-panel-' + panelID)
            panel.setAttribute('data-panel-id', panelID)
            // panel.classList.add(panelDirection)
            panel.classList.add(panelPosition)
            
            panel.append(wrap);
            if(breadcrumb != null) {

                wrap.append(breadcrumb)
            }
            wrap.append(panelHeader)
            wrap.append(menuClone);

            // if (list.firstElementChild.getAttribute('data-drupal-link-system-path') == '<front>')  {

            if (list.classList.contains('unit-level'))  {

                // panelDirection = 'hide-right';  
                panelPosition = 'right-col';
                panel.classList.add('center-col', 'primary-panel');
                panel.classList.remove('left-col', 'hidden');

                if (list.firstElementChild.getAttribute('data-drupal-link-system-path') == '<front>') {
                    panel.querySelector('.panel-wrap').classList.add('active')
                    panel.classList.add('is-active');
                }
                else {
                    panel.classList.add('hidden');
                    
                }
                // panel.classList.remove('hide-left', 'left-col')
                
            }



            navWrap.append(panel);
        }
    })
    
    currentMenu.remove(); // Delete original mobile menu as it is not needed anymore

}

createMenu(document.querySelector('#' + mainNav));


 // Toggle on click of expander buttons in resources
document.querySelectorAll('#top-resources .toggle-menu').forEach(function(toggle) {
    // this.parentNode.classList.toggle("active");
   
    toggle.addEventListener('click', function(item) {
        // toggle.parentNode.classList.toggle('active');

        
        if (toggle.getAttribute('aria-expanded') == 'true') {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.parentNode.classList.remove('active');

        }
        else {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.parentNode.classList.add('active');
        }
   });

   

   toggle.onkeyup = function(event) {
        switch(event.keyCode) {     
            case 27:
                // if it is escape, close the menu 
                toggle.parentNode.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                break;
            case 40:
                if (toggle.getAttribute('aria-expanded') == 'false') {
                    toggle.setAttribute('aria-expanded', 'true');
                    toggle.parentNode.classList.add('active');
                }
                toggle.parentNode.querySelector('.sub-menu li a').focus();
        }
   }

   
});

var resourceMenuItems = document.getElementById('top-resources')
if (resourceMenuItems) {
    resourceMenuItems.onkeydown =  function(event){
    
                activeItem = document.activeElement;
                
                switch(event.keyCode) {
                    case 37:    
                    event.preventDefault();
    
    
                        if(activeItem.parentNode.classList.contains('top-level') && activeItem.parentNode.previousSibling != null) {
                            activeItem.parentNode.previousElementSibling.querySelector('.toggle-menu').focus();
                            break;
                        }
                        if(activeItem.parentNode.parentNode.classList.contains('sub-menu')) {
                            activeItem.parentNode.parentNode.parentNode.classList.remove('active');
                            activeItem.parentNode.parentNode.parentNode.setAttribute('aria-expanded', 'false');
                            
                            if(activeItem.parentNode.parentNode.parentNode.previousElementSibling != null) {
                                activeItem.parentNode.parentNode.parentNode.previousElementSibling.querySelector('.toggle-menu').focus();
                                break;
                            };
                            if (activeItem.parentNode.parentNode.previousSibling == null) {
                                activeItem.parentNode.parentNode.querySelector('.toggle-menu').focus();
                            }
                            break;
                        }
                        else {
                            break;
                        }
                    case 38:
                        event.preventDefault();
    
                        if (activeItem.parentNode.classList.contains('top-level')){
                            break;
                        }
                        if(activeItem.parentNode.previousElementSibling == null) {
                            var toggle = activeItem.parentNode.parentNode.parentNode.querySelector('.toggle-menu')
                            activeItem.parentNode.parentNode.parentNode.classList.remove('active');
                            activeItem.parentNode.parentNode.parentNode.setAttribute('aria-expanded', 'false');
                            toggle.focus();
    
                            break;
                        }
                        if(activeItem.parentNode.parentNode.classList.contains('sub-menu')) {
                            if (activeItem.parentNode.previousElementSibling != null) {
                                activeItem.parentNode.previousElementSibling.querySelector('a').focus();
    
                            }
                            break;
                        }
                        break;
                       
                    case 39:
                        event.preventDefault();
    
                        if (activeItem.classList.contains('toggle-menu') && activeItem.parentNode.nextElementSibling !== null) {
                            activeItem.parentNode.nextElementSibling.querySelector('.toggle-menu').focus();
                            activeItem.parentNode.parentNode.classList.remove('active');
                            activeItem.parentNode.parentNode.setAttribute('aria-expanded', 'false');
    
                        }
                       
                        if(activeItem.parentNode.parentNode.classList.contains('sub-menu')) {
                            if(activeItem.parentNode.parentNode.parentNode.nextElementSibling != null) {
                                activeItem.parentNode.parentNode.parentNode.nextElementSibling.querySelector('.toggle-menu').focus();
                                activeItem.parentNode.parentNode.parentNode.classList.remove('active');
                                activeItem.parentNode.parentNode.parentNode.setAttribute('aria-expanded', 'false');
                                break;
                            };
    
                            if (activeItem.parentNode.parentNode.nextSibling === null) {
                                activeItem.parentNode.parentNode.classList.remove('active');
                                activeItem.parentNode.parentNode.setAttribute('aria-expanded', 'false');
                                activeItem.parentNode.parentNode.querySelector('.toggle-menu').focus();
                                break;
                            }
                        }
                        break;
                    case 40:
                        event.preventDefault();
                        if (activeItem.classList.contains('toggle-menu')) {
                            activeItem.parentNode.setAttribute('aria-expanded', 'true');
                            activeItem.parentNode.classList.add('active');
                            activeItem.parentNode.querySelector('a').focus();
                            break;
                        }
                        if(activeItem.parentNode.parentNode.classList.contains('sub-menu') && activeItem.parentNode.nextElementSibling != null) {
                            activeItem.parentNode.nextElementSibling.querySelector('a').focus();
                            break;
                        }
                        break;
                }
            }

}



// Hover over Resources
document.querySelectorAll('#top-resources .parent').forEach(function(item) {
    
    var timer;

    item.onmouseover = function() {
        clearTimeout(timer);
        item.classList.add('active');
        item.querySelector('button').setAttribute('aria-expanded', 'true')

    };
    
    item.onmouseleave = function() {
        timer = setTimeout(function() {
    
            item.classList.remove('active');
            item.querySelector('button').setAttribute('aria-expanded', 'false')
        }, 1);
    
    }

    item.onkeyup = function(event) {

        switch(event.keyCode) {     
            case 27:
                // if it is escape, close the menu 
                item.classList.remove('active');
                item.querySelector('button').setAttribute('aria-expanded', 'false')
                item.querySelector('button').focus();
                break;
        }
   }
   });


// // Slider Nav Toggle Functionality
// window.addEventListener('click', function(e){
//     if ( this.document.querySelector('.nav-wrap').classList.contains('active') && !(document.getElementById('main-navigation').contains(e.target))){
//        closeMenu();
//     }
//     else {
//         console.log("nope not clicking close for some reason");
//     }
// });

// document.getElementById('main-navigation').addEventListener('click', function(e){
//     if ( this.document.querySelector('.nav-wrap').classList.contains('active')) {
//         closeMenu();
//     }
// });

let usedToggle = '';

document.querySelectorAll('#main-navigation .nav-wrap button.toggle-menu').forEach(function(toggle) {

    toggle.addEventListener('click', function(e){
        e.target.classList.add('active-toggle');
        togglePanels(e.target)
        
    });

});

function togglePanels(toggle) {

    let currentPanel = toggle.closest('.nav-panel');
        target = toggle.getAttribute('data-panel-target')
        targetPanel = document.getElementById(target)

        if(toggle.classList.contains('menu-breadcrumb')){

            currentPanel.classList.remove('is-active')
            targetPanel.classList.remove('hidden');
            targetPanel.classList.remove('slide-out');

            setTimeout(function() {
                currentPanel.classList.add('hidden');
            }, 500);

        }
      
        else {
            if (toggle.parentNode.classList.contains('unit-level')) {
                currentPanel.classList.add('hidden');
            }
            
            if (document.querySelector('.right-col.is-active')) {
                document.querySelector('.right-col.is-active .panel-wrap').classList.remove('is-active');
                document.querySelector('.right-col.is-active').classList.add('hidden')
                document.querySelector('.right-col.is-active').classList.remove('is-active');
            }
            
            if (currentPanel.classList.contains('primary-panel')) {
                // currentPanel.classList.add('hide-left');
                currentPanel.classList.add('slide-out');
                

                setTimeout(function() {
                    // currentPanel.classList.add('hidden');
                    targetPanel.classList.add('is-active');

                }, 5);
            }
            
            toggle.setAttribute('aria-expanded', 'true');

            targetPanel.querySelector('.panel-wrap').classList.add('active');
        }

        targetPanel = document.querySelector('#' + target);
        targetPanel.classList.remove('hidden');
}

    document.querySelector('#main-navigation .nav-wrap').addEventListener('click', function(e){
        if(e.target.classList.contains('nav-wrap')) {
            document.querySelector('.nav-wrap').classList.remove('active');
            document.querySelector('body').classList.remove('no-scroll');
            document.querySelector('#main-menu-btn').setAttribute('aria-expanded', 'false');
            document.getElementById('site-header').classList.remove('full-height');

        }
    })


//     // Menu Escape
parentLink = '';


document.querySelector('#main-navigation .nav-wrap').onkeydown = function(e) {
    let menuFocusableElements = "button, [href]";
    let currentActive = document.activeElement;
    let currentPanel = document.querySelector('.nav-wrap');
    let menuBtn = document.getElementById('main-menu-close');
    let focusableContent = currentPanel.querySelectorAll(menuFocusableElements);
    let firstFocus = focusableContent[0];
    let lastFocus = focusableContent[focusableContent.length - 1];
    let next = '';

    let targetPanelID = currentActive.parentNode.getAttribute('data-panel-parent');

    switch(e.keyCode) {  
           
        case 27:
            closeMenu();
            break;
        case 9: 
            if (e.shiftKey) {
                if (currentActive  === firstFocus) {
                    let lastChild = document.querySelector('.site-level').querySelector('li:last-child');
                    if (window.getComputedStyle(lastChild).display === 'none') {
                        lastChild.previousElementSibling.querySelector("button").focus();
                        e.preventDefault();

                        break;
                    }
                    
                    document.querySelector('.site-level').querySelector('li:last-child').focus();
                    break;
                }

                if ( (currentActive.closest('ul') && currentActive.closest('ul').classList.contains('site-level')) || currentActive.classList.contains('menu-close') || currentActive.classList.contains('nav-panel-header')) {
                    break;
                }
               
                if ( currentActive.closest('ul') && currentActive.parentNode.tagName != "H2" && (!(currentActive.closest('ul').classList.contains('expanded-menu')) && currentActive.parentNode.previousElementSibling == null)) {
                    
                    parentToggle = document.querySelector('.active-toggle');
                    parentToggle.classList.remove('active-toggle');
                    parentToggle.focus();
                    
                    currentActive.closest('.nav-panel').classList.remove('is-active')
                    targetPanel.classList.remove('hidden', 'slide-out');
                    currentActive.closest('.nav-panel').classList.add('hidden');
                    e.preventDefault();
                    // currentActive.closest('.panel-wrap').querySelector('a').focus();
                    break;
                }
                
                break;
            }
            else {
                
                var nextItem = currentActive.parentNode.nextElementSibling;
                let targetPanelID = currentActive.parentNode.getAttribute('data-panel-target');
                var parentPanelID = currentActive.parentNode.getAttribute('data-panel-parent');
                let target = document.getElementById(targetPanelID);

                if (parentPanelID != null) {
                    let parentPanelSibling = document.querySelector(`[data-panel-id="${parentPanelID}"]`).nextElementSibling;
                    
                    // top level, but the next top level is invisible
                    if (currentActive.classList.contains('top-level-toggle') && window.getComputedStyle(nextItem).display === "none") {
                        e.preventDefault();
                        firstFocus.focus();
                        break;
                    }

                    //
                    if (nextItem == null && currentActive.closest('.expanded-menu') == null && window.getComputedStyle(parentPanelSibling).display !== "none") {
                        currentActive.closest('.panel-wrap.active').classList.remove('active');
                        currentActive.closest('.nav-panel.is-active').classList.add('hidden');
                        currentActive.closest('.nav-panel.is-active').classList.remove('is-active');
                        parentPanelSibling.querySelector('.toggle-menu').focus();
                        e.preventDefault();

                        break;
                    }
                    if (nextItem == null && window.getComputedStyle(parentPanelSibling).display === "none") {
                        e.preventDefault();

                        currentActive.closest('.panel-wrap.active').classList.remove('active');
                        currentActive.closest('.nav-panel.is-active').classList.add('hidden');
                        currentActive.closest('.nav-panel.is-active').classList.remove('is-active');
                        firstFocus.focus();                    
                        break;
                    }
                    
                    if (currentActive.parentNode.classList.contains('top-level') && document.querySelector('.nav-panel.is-active:not(.primary-panel)')) {
                        
                        document.querySelector('.nav-panel.is-active:not(.primary-panel) .panel-wrap').classList.remove('active');
                        document.querySelector('.nav-panel.is-active:not(.primary-panel)').classList.add('hidden');
                        document.querySelector('.nav-panel.is-active:not(.primary-panel').classList.remove('is-active');
                        
                    }

                    if (currentActive.closest('.top-level-child') != null) {
                        break;
                    }
                   
                    break;

                }

                // If the next item is display none, which on desktop it will be, go to the close button
               

                // handles flow from one top level item to another
                if (currentActive.classList.contains('top-level-toggle')) {
                    // target.classList.remove('is-active');
                    // target.classList.add('hidden');
                    target.querySelector('.panel-wrap').classList.remove('active');
                    currentActive.classList.remove('active');
                    currentActive.setAttribute('aria-expanded', false);
                    break;
                }

                if (nextItem == null && currentActive.parentNode.nextElementSibling == null && currentActive.closest('.menu-item--expanded') == null) {
                    if(currentActive.closest('.panel-wrap.active')){
                        currentActive.closest('.panel-wrap.active').classList.remove('active');
                        currentActive.closest('.nav-panel.is-active').classList.add('hidden');
                        currentActive.closest('.nav-panel.is-active').classList.remove('is-active');
                        document.querySelector(`[data-panel-id="${targetPanelID}"]`).querySelector('button').focus();
                        break;

                    }

                }
                break;
            }
            // }
        case 37:
            if(currentActive.parentNode.classList.contains('top-level')){
                break;
            }

            if (currentActive.parentNode.parentNode.classList.contains('expanded-menu')) {
                targetPanelID = currentActive.closest('.parent').getAttribute('data-panel-parent');
                 
                currentActive.closest('.nav-panel').classList.remove('is-active')
                targetPanel.classList.remove('hidden', 'slide-out');
                currentActive.closest('.nav-panel').classList.add('hidden');
                document.querySelector(`[data-panel-id="${targetPanelID}"]`).querySelector('button').classList.remove('is-active');
                document.querySelector(`[data-panel-id="${targetPanelID}"]`).querySelector('button').focus();
                
                break;
                
            }
            if(currentActive.parentNode.classList.contains('menu-item') && targetPanel != undefined){
                
                currentActive.closest('.nav-panel').classList.remove('is-active')
                targetPanel.classList.remove('hidden', 'slide-out');
                currentActive.closest('.nav-panel').classList.add('hidden');
                document.querySelector(`[data-panel-id="${targetPanelID}"]`).querySelector('button').classList.remove('is-active');
                document.querySelector(`[data-panel-id="${targetPanelID}"]`).querySelector('button').focus();
                

            }
            break;
        case 38:
            if (currentActive.classList.contains('nav-panel-header')) {
                firstFocus.focus();
                break;
            }
            if (currentActive.tagName == 'BUTTON') {
                var parentNav = document.querySelector('.nav-panel.is-active:not(.primary-panel');
                
                if (currentActive.parentNode.previousElementSibling == null) {
                    if (parentNav) {

                        parentNav.classList.remove('is-active');
                        parentNav.classList.add('hidden');
                        parentNav.querySelector('.panel-wrap').classList.remove('active')
                    }
                    currentActive.parentNode.closest('.panel-wrap').querySelector('.nav-panel-header').focus();
                    break;

                }
                else {

                    if (parentNav) {

                        parentNav.classList.remove('is-active');
                        parentNav.classList.add('hidden');
                        parentNav.querySelector('.panel-wrap').classList.remove('active')
                    }

                    currentActive.parentNode.previousElementSibling.firstElementChild.focus();
                    break;

                }
            }
           
            if (currentActive.closest('.expanded-menu') != null && currentActive.parentNode.previousElementSibling == null) {
                currentActive.closest('.menu-item--expanded').querySelector('ul > li > a').focus();
                break;
            }
            if (currentActive.parentNode.previousElementSibling != null && currentActive.parentNode.previousElementSibling.classList.contains('menu-item--expanded')) {

                currentActive.parentNode.previousElementSibling.querySelector('ul > li:last-child > a').focus();
                break;
            }
            if (currentActive.parentNode.classList.contains('menu-item') && currentActive.parentNode.previousElementSibling != null) {
                currentActive.parentNode.previousElementSibling.firstElementChild.focus();
                break;
            }
            else {
                break;
            }

        case 39:
            if (currentActive.getAttribute('data-panel-target') == null) {
                break;
            }
            if (currentActive.getAttribute('data-panel-target') != null) {
                currentActive.classList.add('active-toggle');
                togglePanels(currentActive);
                document.getElementById(currentActive.getAttribute('data-panel-target')).querySelector('ul li a').focus();
            }
            break;
        case 40: 
        if (currentActive.tagName == 'BUTTON') {
                var parentNav = document.querySelector('.nav-panel.is-active:not(.primary-panel');
                
                if (currentActive.parentNode.nextElementSibling != null) {
                    currentActive.parentNode.nextElementSibling.firstElementChild.focus();
                    
                    if (parentNav) {

                        parentNav.classList.remove('is-active');
                        parentNav.classList.add('hidden');
                        parentNav.querySelector('.panel-wrap').classList.remove('active')
                    }
                    
                    break;
                }
            }
            if (currentActive.parentNode.classList.contains('parent')) {
                currentActive.parentNode.querySelector(':scope > ul > li > a').focus();
                break;
            }
            if (currentActive.classList.contains('nav-panel-header')) {
                currentActive.parentNode.nextSibling.querySelector('li').firstElementChild.focus();
                // next.firstElementChild.focus();
                break;
            }
            if (currentActive.classList.contains('menu-close')){
                document.querySelector('.nav-panel-header.active-site').focus();
                break;
            }
            if (currentActive.closest('ul').classList.contains('expanded-menu') && currentActive.parentNode.nextElementSibling == null) {
                currentActive.closest('.parent').nextElementSibling.querySelector('a').focus();
                break;
            }
            if (currentActive.parentNode.classList.contains('menu-item') && currentActive.parentNode.nextElementSibling != null) {
                currentActive.parentNode.nextElementSibling.firstElementChild.focus();
                break;
            }
            else {
                break;
            }
        }
    };





document.getElementById('main-menu-btn').addEventListener('click', function(){
    document.querySelector('.nav-wrap').classList.contains('active') ? closeMenu() : openMenu();
    
})


document.getElementById('main-menu-close').addEventListener('click', function(){
   closeMenu();
});

let allLinks = document.querySelectorAll('a');

allLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (link.href.indexOf("#") != -1) {
            closeMenu();
        }
    });
});

function closeMenu() {
    let activePanel = document.getElementById(mainNav).querySelector('div.is-active');
    document.body.classList.remove('no-scroll');
    document.getElementById('site-header').classList.remove('full-height');

    document.querySelector('.nav-wrap.active').classList.remove('active');


    if (document.querySelector('.nav-panel.is-active:not(.primary-panel)')) {
        var parentNav = document.querySelector('.nav-panel.is-active:not(.primary-panel');
        parentNav.classList.remove('is-active');
        parentNav.classList.add('hidden');
        parentNav.querySelector('.panel-wrap').classList.remove('active')

 

    }
    

    // document.querySelector('.nav-panel.is-active:not(.primary-panel').classList.remove('is-active');

    document.querySelector('.primary-panel').classList.remove('hidden', 'slide-out');
    // activePanel.querySelector('.panel-wrap').style.display = "none";
    document.getElementById('main-menu-btn').getAttribute('aria-expanded') == 'false' ? document.getElementById('main-menu-btn').setAttribute('aria-expanded', 'true') : document.getElementById('main-menu-btn').setAttribute('aria-expanded', 'false')
    document.getElementById('main-menu-btn').focus();
}

function openMenu() {
    document.getElementById('site-header').classList.add('full-height');
    let activePanel = document.getElementById(mainNav).querySelector('div.is-active');

    document.body.classList.add('no-scroll');
    document.querySelector('.nav-wrap').classList.add('active');
    document.querySelector('.nav-panel.is-active').classList.add('active');
    document.querySelector('.nav-panel.is-active .panel-wrap').classList.add('is-active');
    // activePanel.querySelector('.panel-wrap').style.display = "none";
    document.getElementById('main-menu-btn').getAttribute('aria-expanded') == 'false' ? document.getElementById('main-menu-btn').setAttribute('aria-expanded', 'true') : document.getElementById('main-menu-btn').setAttribute('aria-expanded', 'false')
    document.querySelector('#main-menu-close').focus();
}

}, false);