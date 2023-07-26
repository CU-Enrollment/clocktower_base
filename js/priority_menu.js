document.addEventListener('DOMContentLoaded', function () {

    const nav = document.getElementById('main-navigation');
    // nav.style.display="flex";
    var priorityBtn = "";
    var priorityListItem = "";
    var priorityListItemWidth = "";
    
    
    var priorityToggle;
    var priorityElement;

    const mainNav = document.getElementById('main-navigation').querySelector('ul');   // Find the Main Navigation nav

    let originalWindow = window.innerWidth;
    var spaceNeeded; 
    var spaceAvailable;
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]';
    const stashList = new Array();
    


    // Append More button
    // Append UL for more button
    // on increase of window size pop them out of more

    

    // Debounce
    function debounce(func, time){
        var time = time || 100; // 100 by default if no param
        var timer;
        return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }


    priorityMenu = function() {
        let priorityNav = document.createElement("nav");
        
        priorityNav.classList.add('menu-item', 'priority-menu') // Create LI for more to be appeneded to menu with
        priorityNav.setAttribute('id', 'priority-menu');
        priorityNav.setAttribute('aria-label', 'Full Menu');

        var mainCopy = mainNav.cloneNode(true);

        
        priorityNav.innerHTML = "<button class='toggle-priority-menu ' aria-live='polite' id='priority-menu-btn' aria-expanded='false' aria-haspopup='true'><i class='fa-light fa-bars'></i><span class='sr-only'> priority menu items</span></button><div class='priority-menu-wrap'><ul class='priority-menu-list'></ul></div>"; // Hidden span to explain what the button does 
        
        document.getElementById('main-navigation').after(priorityNav);


        priorityListItem = document.getElementById('priority-menu')
        priorityListItemWidth = priorityListItem.scrollWidth;
        priorityListItem.classList.add('hidden');

        priorityBtn = document.getElementById('priority-menu-btn');

        let closePriority = document.createElement("button");
        closePriority.setAttribute('id', 'close-priority');
        closePriority.innerHTML = '<span class="sr-only">Close Full Menu</span>';
        priorityListItem.querySelector('.priority-menu-wrap').append(closePriority)


        priorityListItem.querySelector('.priority-menu-wrap').append(mainCopy);
        
        priorityToggle = document.getElementById('priority-menu-btn');
        priorityElement = document.getElementById('priority-menu');
        
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
        
        // if ( originalWindow < window.innerWidth && mainNav.querySelector('#priority-menu-item').offsetWidth != 0) {
        if ( originalWindow < window.innerWidth) {

            // console.log("stash pop: " + stashList[stashList.length - 1]);

            
            if (spaceNeeded + stashList[stashList.length - 1] <= spaceAvailable) {
                console.log("CHECKING THE POP MENU");
                popMenu();
                console.log("BACK FROM CHECKING");
                return;
            }
        }

        else {
            console.log("CHECKING THE STASH");

            stashMenu();
            console.log("BACK FROM CHECKING STASH");

            return;       
        } 
        
    }
     // on Resize 

     window.addEventListener('resize', function(event) {
         debounce(checkSpace());
         originalWindow = window.innerWidth;
    }, true);

    popMenu = function() {
        
        let topLevel = mainNav.querySelectorAll(':scope > .top-level:not(.hidden)');        
        let topHidden = mainNav.querySelectorAll(':scope > .top-level.hidden');        
        let popNext = stashList[stashList.length - 1];
        console.log(priorityElement.scrollWidth);
        while (spaceNeeded <= (spaceAvailable + popNext) && stashList.length > 0) {

            if (stashList.length == 0) {
                console.log("stash list hit zero");
                priorityListItem.classList.add('hidden');

                break;
            }
            if (stashList.length == 1) {
                // (spaceNeeded - priorityListItem.offsetWidth) + popNext <= spaceAvailable) {
                console.log("stash list is at one");
                mainNav.querySelector('.top-level.hidden').classList.remove('hidden');
                priorityListItem.classList.add('hidden');
                topHidden = mainNav.querySelectorAll(':scope > .top-level.hidden');  
                
                stashList.pop();
                priorityListItem.classList.add('hidden');
                break;
             
            }

            if (stashList.length > 1 && ( (spaceNeeded + popNext + priorityElement.scrollWidth) <= spaceAvailable) ){
                console.log("space to move!");
                mainNav.querySelector('.hidden').classList.remove('hidden');
                // mainNav.insertBefore(priorityMenuItems[0], mainNav.querySelector('#priority-menu-item'));
                // priorityMenuItems = priorityMenu.querySelectorAll(".top-level");
                topHidden = mainNav.querySelectorAll(':scope > .top-level.hidden');  
                stashList.pop();
                console.log(topHidden);
                console.log("Stash List in last if is: " + stashList.length);
                // priorityBtn.setAttribute('data-items', stashList.length);
                break;
            }
            
           
            spaceNeeded = getWidth(); 
            spaceAvailable = document.querySelector('#header-right').offsetWidth; 
            topLevel = mainNav.querySelectorAll(':scope > .top-level:not(.hidden)');        
            popNext = stashList[stashList.length -1];

            return
        }

    }

    stashMenu = function() {

        while ( spaceNeeded > spaceAvailable) {

            let topLevel = mainNav.querySelectorAll(':scope > .top-level:not(.hidden)');
            let lastItem =  topLevel[topLevel.length - 1];
            let lastItemWidth = lastItem.offsetWidth;

            stashList.push(lastItemWidth);
            priorityListItem.classList.remove('hidden');    // If we are stashing, then we will need the all button to show
                
            lastItem.classList.add('hidden'); // Hidding the last item

            spaceNeeded = getWidth() + priorityElement.scrollWidth;
            spaceAvailable = document.querySelector('#site-header').scrollWidth * .40;

            var itemNumber = document.querySelectorAll('.priority-menu-list li.top-level').length;

            priorityBtn.setAttribute('data-items', itemNumber);

            
        }
    }

    priorityMenu();
    checkSpace();
    mainNav.style.opacity= '1';
    // mainNav.style.clip = 'unset';
    
    
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
    
    // priorityElement.querySelector('.mega-menu').onmouseover = function() {
    //     clearTimeout(timer);
    //     openMegaMenu(priorityBtn);
    // };
    
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

   

var priorityDropdowns = document.querySelector('.priority-menu-wrap').querySelectorAll('.toggle-menu');

priorityDropdowns.forEach(dropdown => {

    dropdown.addEventListener('click', function(){
        if (dropdown.getAttribute('aria-expanded') == 'false') {
            dropdown.setAttribute('aria-expanded', 'true');

        }
        else {
            dropdown.setAttribute('aria-expanded', 'false');
        }
        dropdown.closest('.parent').classList.toggle('active');

    });
});
}, false);