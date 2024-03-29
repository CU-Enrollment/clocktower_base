/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/



var tablist = document.querySelectorAll('[role="tablist"]')[0];


if (tablist != null) {
  (function () {
      var tablist = document.querySelectorAll('[role="tablist"]')[0];
      var tabs;
      var panels;
        delay = determineDelay();
        indicator = document.createElement('div');
        indicator.classList.add('tab-indicator');
        tablist.append(indicator);
      

      generateArrays();
      

      function generateArrays () {
        tabs = document.querySelectorAll('[role="tab"]');
        panels = document.querySelectorAll('[role="tabpanel"]');
      };
    
      // For easy reference
      var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
      };
    
      // Add or substract depending on key pressed
      var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
      };
    
      // Bind listeners
      for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
      };
    
      function addListeners (index) {
        tabs[index].addEventListener('click', clickEventListener);
        tabs[index].addEventListener('keydown', keydownEventListener);
        tabs[index].addEventListener('keyup', keyupEventListener);
    
        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index;
      };
          
      // When a tab is clicked, activateTab is fired to activate it
      function clickEventListener (event) {
        var tab = event.target.closest('button');
        activateTab(tab, false);
      };
    
      function indicatorPosition () {
        activeTab = document.querySelector('[role="tablist"] [aria-selected="true"]');
        indicator = document.querySelector('.tab-indicator');
        width = activeTab.offsetWidth;
        currentTabs = Array.from(tabs);
        currentTab = document.querySelector('[role="tab"].active');
        left = activeTab.offsetLeft;
        indicator.style.left = left + "px";
        indicator.style.width = width + "px";
      }

      indicatorPosition();

      // Handle keydown on tabs
      function keydownEventListener (event) {
        var key = event.keyCode;
    
        switch (key) {
          case keys.end:
            event.preventDefault();
            // Activate last tab
            activateTab(tabs[tabs.length - 1]);
            break;
          case keys.home:
            event.preventDefault();
            // Activate first tab
            activateTab(tabs[0]);
            break;
    
          // Up and down are in keydown
          // because we need to prevent page scroll >:)
          case keys.up:
          case keys.down:
            determineOrientation(event);
            break;
        };
      };
    
      // Handle keyup on tabs
      function keyupEventListener (event) {
        var key = event.keyCode;
        switch (key) {
          case keys.left:
          case keys.right:
            determineOrientation(event);
            break;
        };
      };
    
      // When a tablistâ€™s aria-orientation is set to vertical,
      // only up and down arrow should function.
      // In all other cases only left and right arrow function.
      function determineOrientation (event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;
    
        if (vertical) {
          if (key === keys.up || key === keys.down) {
            event.preventDefault();
            proceed = true;
          };
        }
        else {
          if (key === keys.left || key === keys.right) {
            proceed = true;
          };
        };
    
        if (proceed) {
          switchTabOnArrowPress(event);
        };
      };
    
      // Either focus the next, previous, first, or last tab
      // depening on key pressed
      function switchTabOnArrowPress (event) {
        var pressed = event.keyCode;
    
        for (x = 0; x < tabs.length; x++) {
          tabs[x].addEventListener('focus', focusEventHandler);
        };
    
        if (direction[pressed]) {
          var target = event.target;
          if (target.index !== undefined) {
            if (tabs[target.index + direction[pressed]]) {
              tabs[target.index + direction[pressed]].focus();
            }
            else if (pressed === keys.left || pressed === keys.up) {
              focusLastTab();
            }
            else if (pressed === keys.right || pressed == keys.down) {
              focusFirstTab();
            };
          };
        };
      };
    
      // Activates any given tab panel
      function activateTab (tab, setFocus) {
        setFocus = setFocus || true;
        // Deactivate all other tabs
        deactivateTabs();
    
        // Remove tabindex attribute
        tab.removeAttribute('tabindex');
  
        
        tab.classList.add('active');
    
        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');
        
        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');
        // Add Active Class to Tab Panel
        document.getElementById(controls).classList.add('active');
        
        indicatorPosition ()
        
        // Set focus when required
        if (setFocus) {
          tab.focus();
        };
      };
    
      // Deactivate all tabs and tab panels
      function deactivateTabs () {
        for (t = 0; t < tabs.length; t++) {
          tabs[t].setAttribute('tabindex', '-1');
          tabs[t].setAttribute('aria-selected', 'false');
          tabs[t].removeEventListener('focus', focusEventHandler);
          tabs[t].classList.remove('active');
        };
    
        for (p = 0; p < panels.length; p++) {
          panels[p].classList.remove('active');
        };
      };
    
      // Make a guess
      function focusFirstTab () {
        tabs[0].focus();
      };
    
      // Make a guess
      function focusLastTab () {
        tabs[tabs.length - 1].focus();
      };
    
      // Determine whether there should be a delay
      // when user navigates with the arrow keys
      function determineDelay () {
        var hasDelay = tablist.hasAttribute('data-delay');
        var delay = 0;
    
        if (hasDelay) {
          var delayValue = tablist.getAttribute('data-delay');
          if (delayValue) {
            delay = delayValue;
          }
          else {
            // If no value is specified, default to 300ms
            delay = 300;
          };
        };
    
        return delay;
      };
    
      //
      function focusEventHandler (event) {
        var target = event.target;
    
        setTimeout(checkTabFocus, delay, target);
      };
    
      // Only activate tab on focus if it still has focus after the delay
      function checkTabFocus (target) {
        focused = document.activeElement;
    
        if (target === focused) {
          activateTab(target, false);
        };
      };
    }());

    // var hash = window.location.hash;

    // if(hash) {
    //     var targetTab = document.querySelector(hash);
    //     var tabList = targetTab.parentNode;
    //     var activeTab = tabList.querySelector('.active');

    //     if (targetTab != null) {

    //         if (activeTab === targetTab) {
    //           targetTab.focus();
    //         }
    //         if (activeTab != targetTab) {
    //           activeTab.classList.remove('active');
    //           activeTab.setAttribute('aria-selected', 'false');
    //           activeTab.setAttribute('tabindex', '-1');

    //           targetTab.classList.add('active');
    //           targetTab.setAttribute('aria-selected', 'true');
    //           targetTab.setAttribute('tabindex', '0');
    //           targetTab.focus();
    //         }

    //     }
    // }

}