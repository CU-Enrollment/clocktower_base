let themeMode = localStorage.getItem('themeMode');
const themeToggle = document.querySelector("#themeToggle");

const enableDarkMode = () => {
    // 1. add data-attribute to body
    // 2. update local storage
    localStorage.setItem('themeMode', 'dark')
    document.body.classList.add('dark-mode');
    
    document.getElementById("themeToggle").setAttribute('aria-checked','true');
    document.getElementById("themeToggle").setAttribute('aria-label','Disable Darkmode');


}
const enableLightMode = () => {
    // 1. add data-attribute to body
    // 2. update local storage
    localStorage.setItem('themeMode', 'light')
    document.body.classList.remove('dark-mode');
    document.getElementById("themeToggle").setAttribute('aria-checked','false');
    document.getElementById("themeToggle").setAttribute('aria-label','Enable Darkmode');
}

if (themeMode === 'dark') {
    enableDarkMode();
}

themeToggle.addEventListener('click', () => {
    // check if dark mode is enabled
    themeMode = localStorage.getItem("themeMode");

    if (themeMode !== 'dark'){
        enableDarkMode();
    }
    else {
        enableLightMode();

    }
});