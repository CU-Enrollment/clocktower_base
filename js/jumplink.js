
document.addEventListener('DOMContentLoaded', function () {

var hash = window.location.hash;

if(hash) {
    
    var targetItem = document.querySelector(hash);
    
    if (targetItem != null && targetItem.classList.contains('accordion-trigger')) {
        targetItem.focus();
        targetItem.closest('.accordion-item').classList.add('active');
    }
    if (targetItem != null && targetItem.getAttribute('role') == 'tab')  {
        
        var tabList = targetItem.parentNode;
        var activeTab = tabList.querySelector('.active');
        var panelID = targetItem.getAttribute('aria-controls');
            if (activeTab === targetItem) {
                targetItem.focus();
            }
            if (activeTab != targetItem) {
                activeTab.classList.remove('active');
                activeTab.setAttribute('aria-selected', 'false');
                activeTab.setAttribute('tabindex', '-1');
                document.querySelector('.tabgroup').querySelector('.active').classList.remove('active');

                targetItem.classList.add('active');
                document.getElementById(panelID).classList.add('active')
                targetItem.setAttribute('aria-selected', 'true');
                targetItem.setAttribute('tabindex', '0');
                targetItem.focus();
            }

        
    }
    
}

});