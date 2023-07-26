let themeMode = localStorage.getItem('themeMode');
let animationStatus = localStorage.getItem('animationStatus')

const themeToggle = document.getElementById("themeToggle");
const animationToggle = document.getElementById("animationToggle");

const enableDarkMode = () => {
    localStorage.setItem('themeMode', 'dark')
    document.body.classList.add('dark-mode');
    
    document.getElementById("themeToggle").setAttribute('aria-checked','true');
    document.getElementById("themeToggle").setAttribute('aria-label','Disable Darkmode');

}

const enableLightMode = () => {
    localStorage.setItem('themeMode', 'light')
    document.body.classList.remove('dark-mode');
    document.getElementById("themeToggle").setAttribute('aria-checked','false');
    document.getElementById("themeToggle").setAttribute('aria-label','Enable Darkmode');
}

if (themeMode === 'dark') {
    enableDarkMode();
}

if (themeToggle != null) {

    themeToggle.addEventListener('click', () => {
        console.log("DARK MODE");
        themeMode = localStorage.getItem("themeMode");
    
        if (themeMode !== 'dark'){
            enableDarkMode();
        }
        else {
            enableLightMode();
    
        }
    });
}



const enableAnimation = () => {
    localStorage.setItem('animationStatus', 'running')
    
    document.getElementById("animationToggle").setAttribute('aria-checked','false');
    document.getElementById("animationToggle").setAttribute('aria-label','Disable Animations');

    document.documentElement.style.setProperty("--toggle", "1");
    document.documentElement.style.setProperty("--playState", 'running')
}

const stopAnimation = () => {
    localStorage.setItem('animationStatus', 'paused')
    
    document.getElementById("animationToggle").setAttribute('aria-checked','true');
    document.getElementById("animationToggle").setAttribute('aria-label','Enable Animations');

    document.documentElement.style.setProperty("--toggle", "0");
    document.documentElement.style.setProperty("--playState", 'paused')

}


if (animationStatus == 'paused') {
    stopAnimation();
}

if (animationToggle != null) {

    animationToggle.addEventListener('click', () => {
        console.log("ANIMATION MODE");
        console.log(animationStatus)
        // check if dark mode is enabled
        animationStatus = localStorage.getItem("animationStatus");
        console.log(animationStatus);
    
        if (animationStatus === 'running'){
            // console.log(animationStatus)
            console.log("i'm playing, but I should pause");
            stopAnimation();
    
        }
        if (animationStatus === 'paused') {
            console.log("I'm paused but should play");
            enableAnimation();
    
            
        }
    });
}



