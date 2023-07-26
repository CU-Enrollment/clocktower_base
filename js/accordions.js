/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
    var accordionGroups = document.querySelectorAll('.accordion-group');
    var accordionButtons = document.querySelectorAll('.accordion-trigger');

    
    // Need to get all accordions to have proper aria and ids for accessibility
    accordionGroups.forEach( (accordion, group) => {
        let btn = document.createElement("button");
        btn.innerHTML = "Expand All";
        btn.setAttribute('id', 'expand-all-' + group);
        btn.classList.add('expand-all');

        accordion.prepend(btn);


        var accordionItem = accordion.querySelectorAll('.accordion-item');
        
        accordionItem.forEach( (item, index) => {
            accordion.setAttribute('id', 'accordion-group-' + group)
            
            var accordionHeader  = item.querySelector('h3');
            var accordionPanel = item.querySelector('.accordion-panel');
            var accordionButton = item.querySelector('button') 

            accordionPanel.setAttribute('id', 'panel-'+ group + '-' + index);

            const attributes = {
                'aria-expanded': 'false',
                'aria-controls': 'panel-' + group + '-' + index,
                'id': 'accordion-trigger-' + group + '-' + index
            }
        });
    }); 

    var allExpand = document.querySelectorAll('.expand-all');
    
    allExpand.forEach( (button, group) => {
        button.addEventListener('click', function() {
            expandAll(button, group);
        });
    });
 
    accordionButtons.forEach( (button, group) => {
        button.addEventListener('click', function() {
              toggleAccordion(button);

            if ( (checkExpandStatus(button) == false)) {
                button.closest('.accordion-group').querySelector('.expand-all').innerHTML = 'Expand All';
            }
            else {
                button.closest('.accordion-group').querySelector('.expand-all').innerHTML = "Collapse All";

            };
        });
    });

    function expandAll(element, group) {
        var accordionGroup =  document.getElementById('accordion-group-' + group);
        var toggleButtons = accordionGroup.querySelectorAll('.accordion-trigger');
        var items = accordionGroup.querySelectorAll('.accordion-item');

        if (checkExpandStatus(element) == true) {
            
            element.classList.remove('collapse-all');
            element.innerHTML = "Expand All";

            toggleButtons.forEach( button =>  {
                button.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
            });
    
            items.forEach( item =>  {
                item.classList.remove('active');
            });
        }

        else {

            element.classList.add('collapse-all');

            element.innerHTML = "Collapse All";
            
            toggleButtons.forEach( button =>  {
                button.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            });
    
            items.forEach( item =>  {
                item.classList.add('active');
            });
        }


    }


    function checkExpandStatus(element) {
        var expanders = element.closest('.accordion-group').querySelectorAll('.accordion-trigger');
        let allExpanded = true;
        expanders.forEach(expander => { 
            
            if (!(expander.classList.contains('active'))) {
                allExpanded = false;
            }
        });
        return allExpanded;       
    }

    function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr]);
        });
    }

    function toggleAccordion(element) {
        var id = element.getAttribute('aria-controls');

        element.classList.toggle('active');
        element.closest('.accordion-item').classList.toggle('active');

        var status = element.getAttribute('aria-expanded')
        
        if (status == 'false') {
            element.setAttribute('aria-expanded', true);
        }
       else {
        element.setAttribute('aria-expanded', false);

       }

    }

    // var hash = window.location.hash;

    // if(hash) {
          
    //     var activeAccordion = document.querySelector(hash);

    //     if (activeAccordion != null) {
    //         activeAccordion.focus();
    //         activeAccordion.closest('.accordion-item').classList.add('active');
    //     }
    // }
  }());