document.addEventListener('DOMContentLoaded', function () {

    const nav = document.getElementById('main-navigation');
    // nav.style.display="flex";


    const mainNav = document.getElementById('main-navigation').querySelector('ul');   // Find the Main Navigation nav

    let originalWindow = window.innerWidth;
    var spaceNeeded; 
    var spaceAvailable;
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]';
    const stashList = new Array();
    
    // Append More button
    // Append UL for more button
    // on increase of window size pop them out of more

    let more = document.createElement("li");
    more.classList.add('menu-item', 'priority-menu') // Create LI for more to be appeneded to menu with
    more.setAttribute('id', 'priority-menu-item')
    more.innerHTML = "<button class='toggle-priority-menu ' aria-live='polite' id='priority-menu-btn' aria-expanded='false' aria-haspopup='true'><i class='fa-light fa-bars'></i><span class='sr-only'> priority menu items</span></button><div class='mega-menu'><ul class='menu list-menu links sub-menu priority-menu-list'></ul></div>"; // Hidden span to explain what the button does 
    mainNav.append(more);

    const priorityListItem = document.getElementById('priority-menu-item')
    const priorityListItemWidth = priorityListItem.scrollWidth;
    priorityListItem.classList.add('hidden');

    const priorityBtn = document.getElementById('priority-menu-btn');

    // Debounce
    function debounce(func, time){
        var time = time || 100; // 100 by default if no param
        var timer;
        return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }


    // This checks for all the widths, of all the items and retuns it
    getWidth = function() {
        

        let menuItems = mainNav.querySelectorAll(':scope > li'); // Need total width of all list items

        let listWidth = 0;    

        // console.log(menuItems);

        for(i = 0; i < menuItems.length; i++ ) {
            // let margin = menuItems[i].offsetWidth;
            // console.log('menu item width is: ' + Math.ceil(menuItems[i].offsetWidth) ); 
            listWidth = listWidth + Math.ceil(menuItems[i].offsetWidth);
        }

        return listWidth;
      
    }

    checkSpace = function() {

        spaceNeeded = getWidth(); 

        spaceAvailable = document.querySelector('#header-right').offsetWidth; 
 
        if ( originalWindow < window.innerWidth && mainNav.querySelector('#priority-menu-item').offsetWidth != 0) {
            console.log("stash pop: " + stashList[stashList.length - 1]);

            
            if (spaceNeeded + stashList[stashList.length - 1] <= spaceAvailable) {

                popMenu();
                return;
            }
        }

        else {
            stashMenu();
            return;       
        } 
        
    }
     // on Resize 

     window.addEventListener('resize', function(event) {
        if (originalWindow > window.innerWidth) {
            console.log("shrinking");
        }
        if (originalWindow < window.innerWidth) {
            console.log("growing");
        }
         debounce(checkSpace());
         originalWindow = window.innerWidth;
    }, true);

    popMenu = function() {
        
        let priorityMenu = document.querySelector('.priority-menu-list');
        
        priorityMenuItems = priorityMenu.querySelectorAll(".top-level"); // we only care about top-level li items
        let popNext = stashList[stashList.length - 1];

        while (spaceNeeded <= (spaceAvailable + popNext) && priorityMenuItems.length > 0) {

            if (priorityMenuItems.length == 0) {
                priorityListItem.classList.add('hidden');
                return;
            }

            if (priorityMenuItems.length == 1 && (spaceNeeded - priorityListItem.offsetWidth) + popNext <= spaceAvailable) {
                // console.log("Only one item, and there is space available");
                mainNav.insertBefore(priorityMenuItems[0], mainNav.querySelector('#priority-menu-item'));
                priorityListItem.classList.add('hidden');
                stashList.pop();

                return;
             
            }

            if (priorityMenuItems.length > 1 && (spaceNeeded + popNext) <= spaceAvailable){

                mainNav.insertBefore(priorityMenuItems[0], mainNav.querySelector('#priority-menu-item'));
                priorityMenuItems = priorityMenu.querySelectorAll(".top-level");
                stashList.pop();
                priorityBtn.setAttribute('data-items', stashList.length);


                return;
            }
            
            spaceNeeded = getWidth(); 
            spaceAvailable = document.querySelector('#header-right').offsetWidth; 
            priorityMenuItems = priorityMenu.querySelectorAll(".top-level");
            popNext = stashList[stashList.length -1];
            return;
   
        }

    }

    stashMenu = function() {
      
        while ( spaceNeeded > spaceAvailable) {

            let topLevel = mainNav.querySelectorAll(':scope > .top-level');
            let lastItem =  topLevel[topLevel.length - 1];
            let lastItemWidth = lastItem.offsetWidth;
            
            stashList.push(lastItemWidth);


            priorityListItem.classList.remove('hidden');    // If we are stashing, then we will need the all button to show
                
            document.querySelector('.priority-menu-list').prepend(lastItem);    // Stash it into the priority menu

            spaceNeeded = getWidth();
            spaceAvailable = document.querySelector('#site-header').scrollWidth * .40;

            var itemNumber = document.querySelectorAll('.priority-menu-list li.top-level').length;
            priorityBtn.setAttribute('data-items', itemNumber);
        }
    }


    checkSpace();
    mainNav.style.opacity= '1';
    // mainNav.style.clip = 'unset';
    const priorityToggle = document.getElementById('priority-menu-btn');
    const priorityElement = document.getElementById('priority-menu-item');
    
    priorityToggle.addEventListener('click', function() {
        priorityToggle.parentNode.classList.toggle('active');
    });


    function closeMegaMenu(item) {
        item.parentElement.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');

    }

    function openMegaMenu(item) {
        var prevActive = document.getElementById('main-navigation').querySelector('.top-level.active');
        if (prevActive != null) {
            prevActive.classList.remove('active');
        }
        item.parentElement.classList.add('active');
        item.setAttribute('aria-expanded', 'true');
    }

    var timer;
    // Hover
    
    priorityElement.querySelector('.mega-menu').onmouseover = function() {
        clearTimeout(timer);
        openMegaMenu(priorityBtn);
    };
    
    priorityElement.onmouseleave = function() {
        // timer = setTimeout(function() {
        //     closeMegaMenu(priorityBtn);
        // }, 100);

    };

    priorityElement.onkeydown = function(e) {
        let currentActive = document.activeElement;
        let focusableContent = priorityElement.querySelectorAll(focusableElements);
        let firstFocusableElement = focusableContent[1];
        let lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        switch(e.keyCode) {     
            case 27:
                console.log("rar");
                // if it is escape, close the menu 
                priorityElement.classList.remove('active');
                priorityElement.querySelector('button').setAttribute('aria-expanded', 'false')
                priorityElement.querySelector('#priority-menu-btn').focus();
                break;
            case 9: 
                if (e.shiftKey) {
                    if (firstFocusableElement  === document.activeElement ) {
                        priorityElement.classList.remove('active');
                        break;
                    }
                }
                else {
                    if (currentActive === lastFocusableElement) {
                        priorityElement.classList.remove('active');
                        document.querySelector('.cu-seal').focus();
                        e.preventDefault();
                        break;
                    }
                }
                
                break;
            }   
   }

//    nav.style.display = 'flex'; // put the menu back in after initial go through
mainNav.style.display = "flex";

   
}, false);