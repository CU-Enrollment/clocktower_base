// To Do
//  -- menu toggle
//  -- aria-expanded toggle
//  -- keyboard navigation
 
document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById('search-utility')) {
        const searchToggle = document.querySelector('.open-search');
        var searchForm = document.getElementById('search-utility').querySelector('form');
        searchForm.setAttribute('id', 'search-utility-form');
        const searchInput = document.getElementById('search-utility-form').querySelector('input[type="search"]');
        const searchInputLabel = document.getElementById('search-utility-form').querySelector('label');
        searchInput.setAttribute('id', 'edit-search-utility');
        searchInput.value=""

        searchInputLabel.setAttribute('for', 'edit-search-utility');
        const searchWrap = document.querySelector('#search-utility .search-wrapper'); 
        const utilityNav = document.getElementById('utility-nav');
        
        let cancel = document.createElement('button');
        cancel.classList.add('search-toggle');
        cancel.setAttribute('id', 'cancel-search');
    
        cancel.innerHTML = "<span class='sr-only'>Close Search</span>";
    
        searchForm.append(cancel);
   
        searchToggle.addEventListener('click', function() {
            searchWrap.classList.toggle('active');
            searchInput.focus();
            searchToggle.style.display = "none";
            utilityNav.style.display = "none";
        });
        
        const cancelSearch = document.getElementById('cancel-search');
        
        closeSearch = function() {
            searchWrap.classList.remove('active');
            searchToggle.style.display = "initial";
            utilityNav.style.display = "flex";
            searchToggle.focus();
    
        }
        cancelSearch.addEventListener('click', function() {
            event.preventDefault();
            closeSearch();
        });
    
        
        searchForm.onkeyup = function(event) {
            switch(event.keyCode) {     
                case 27:
                    // if it is escape, close the menu 
                    closeSearch();
                    break;
            }
        }
    }
    
    // Mobile Search
    mobileSearch = document.getElementById('mobile-search');
    // console.log("mobile-search", mobileSearch);
    // console.log("wee");

    if ( mobileSearch) {
        var openSearch =  document.getElementById('open-search-mobile');
        var closeMobile = document.getElementById('close-mobile-search');
        
        var mobileForm = document.getElementById('mobile-search').querySelector('form');

        mobileForm.setAttribute('id', 'mobile-search-form');

        closeMobile.addEventListener('click', function() {
            mobileSearch.classList.remove('active');
            mobileSearch.setAttribute('aria-expanded', 'false');
            document.querySelector('body').classList.remove('no-scroll');

        });

        openSearch.addEventListener('click', function() {
            mobileSearch.classList.add('active');
            mobileSearch.setAttribute('aria-expanded', 'true');
            document.querySelector('body').classList.add('no-scroll');

            closeMobile.focus();

        });

        // mobileSearch.on('focus', function() {
        //     document.body.scrollTop = 0;
        // });

        mobileSearch.onkeydown = function(e) {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]';
            let focusableContent = document.querySelector('#mobile-search').querySelectorAll(focusableElements);
            const mobileSearchInput = focusableContent[0];
            const mobileSearchInputLabel = mobileSearch.querySelector('label');
            // mobileSearchInput.setAttribute('id', 'edit-search-mobile');
            let firstFocusableElement = mobileSearchInput;
            let lastFocusableElement = focusableContent[focusableContent.length - 1];

            mobileSearchInput.value=""
            // mobileSearchInputLabel.setAttribute('for', 'edit-search-mobile');
            
            let currentActive = document.activeElement;
            let next = '';

            switch(e.keyCode) {     
                case 27:
                    mobileSearch.classList.remove('active');
                    mobileSearch.setAttribute('aria-expanded', 'false');
                    document.querySelector('body').classList.remove('no-scroll');
                    document.querySelector('#open-search-mobile').focus();
                    break;
                case 9: 
                    if (e.shiftKey) {
                      
                        if (currentActive  === firstFocusableElement) {
                            e.preventDefault();
                            lastFocusableElement.focus();
                            break;
                        }
                    }
                    else {
                        if (currentActive === lastFocusableElement) {
                            e.preventDefault();
                            firstFocusableElement.focus();
                            break;
                        }
                    }
                }
        };

    }
}, false);