// console.log("I am the newer mobile menu yoooooo");
// let test = document.getElementById('testapply');
// let menuBreadcrumb = document.getElementsByClassName('menu-breadcrumb');
// let mobileMenu = document.querySelector('.mobile-main-menu');
// let mobiletoggle = document.querySelector('.mobile-toggle'); // Mobile Toggle Button
// let menuToggles = document.getElementsByClassName('toggle-menu'); // Expand Toggles

// for (const breadcrumb of menuBreadcrumb) {
//     console.log(breadcrumb);
//     breadcrumb.addEventListener("click", function() {
//         let parentPanel = this.parentNode;
//         let targetPanel = this.getAttribute('data-panel-target');
    
//         // if it is a breadcrumb we are going left, so it should hide right
//         parentPanel.classList.add('hide-right');
    
//         // Remove the hide-left class so that it will slide in from the left to reveal
//         document.querySelector('[data-panel="' + targetPanel + '"]').classList.remove('hide-left');
        
//     });
// }

// for (const toggle of menuToggles) {
//     toggle.addEventListener("click", function() {
//         console.log("i wanna go to the right!");
//         let parentPanel = this.closest(".nav-panel");
//         let targetPanel = this.getAttribute('data-panel-target');
//         parentPanel.classList.add('hide-left');
//         document.querySelector('[data-panel="' + targetPanel + '"]').classList.remove('hide-right');
//     });


// // }
// console.log("yes we have the mobile we are trying to fix it")
// menuLevel('test')
// document.addEventListener('DOMContentLoaded', function () {
//     let mobileMenu = document.getElementById('mobile-menu');
//     let mobileMenuList = document.getElementById('mobile-menu').querySelectorAll('li.menu-item');

//         // Set generic nav panel
//     const navPanel = document.createElement('div');
//     navPanel.classList.add("nav-panel");
//     navPanel.setAttribute('tabindex','-1');


//     for (var i = 0; i < mobileMenuList.length; i++) {
        
//         let panel = navPanel.cloneNode(true);
//         let parentLink = mobileMenuList
        
//         panel.innerHTML = 
//         "<button class='menu-breadcrumb' aria-label='Up one menu' data-panel-target='" + mobileMenuList[i].innerHTML + "'>" + mobileMenuList[i].innerHTML + "</button>" + 
//         "<a href='#' class='nav-panel-header'><h2> " + mobileMenuList[i].innerHTML + "</h2></a>" +
//         "I am panel " + [i] + "";
        
//         mobileMenu.append(panel);

//     }
//     let panelHeader = document.createElement('h2');
//     // const mainMenu = document.getElementById('main-navigation').querySelectorAll('ul.menu > li');
    
//     // breadcrumb creation
//     // let menuBreadcrumb = document.createElement('button')
//     // menuBreadcrumb.setAttribute('aria-label', 'Up one menu', 'data-panel-target', '');
//     // menuBreadcrumb.classList.add('menu-breadcrumb');    


    
//     // Create mobile menu and add attributes
//     // var mobileMenu = document.createElement('nav');
//     // mobileMenu.setAttribute('id', 'mobile-menu');
//     // mobileMenu.setAttribute('aria-label','Mobile');
//     // header.appendChild(mobileMenu);

    


//     // create enrollment panel
//     // let enrollmentPanel = navPanel.cloneNode(true); // This will be the panel we use to put the enrollment links in
//     // const enrollmentMenu = document.querySelector('#enrollment-menu ul'); // this is current enrollment menu we need to clone
//     // let enrollmentMenuList = enrollmentMenu.cloneNode(true); // Clone the menu

//     // enrollmentPanel.setAttribute('data-panel','enrollment');
//     // enrollmentPanel.classList.add('nav-panel-0', 'hide-left')
    
//     // panelHeader = panelHeader.innerHTML("Enrollment");
//     // panelHeader.innerText = "Enrollment"; 
//     // enrollmentPanel.append(panelHeader);
//     // enrollmentPanel.append(enrollmentMenuList);
    
    
//     navPanel.innerHTML = 
//     "<button class='menu-breadcrumb' aria-label='Up one menu' data-panel-target='enrollment'>Enrollment</button>" + 
//     "<a href='#' class='nav-panel-header'><h2>Admissions</h2></a>"
    
//     mobileMenu.append(navPanel);

// }, false);

  

// for (var i = 0; i < menu.length; i++) {
//     if (menu[i].classList.contains('menu-item--expanded')) {
//         menu[i].classList.add("parent");
        
//         menu[i].querySelector('.list-menu').classList.add('sub-menu');
//         // menu[i].querySelector('.sub-menu').querySelector('.list-menu').classList += ' sub-sub';
//         // Create expander buttons
//         let btn = document.createElement("button");
//         let btnText = menu[i].firstElementChild.innerHTML; // Need the text of the link to add to the button later
//         btn.setAttribute("aria-expanded","false"); // Aria-expanded for A11y purposes
//         btn.setAttribute("aria-hidden", "true")
//         btn.innerHTML = "<span class='sr-only'>Expand " + btnText + "</span>"; // Hidden span to explain what the button does 
//         btn.classList.add("toggle-menu"); // Add toggle menu class
//         menu[i].insertBefore(btn, menu[i].querySelector('ul')); // Append the button after the anchor tag, but before the nested UL
//     }
// }


