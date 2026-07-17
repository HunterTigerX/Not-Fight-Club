const buttonHome = document.querySelector('.button__home');
const buttonCharacter = document.querySelector('.button__character');
const buttonSettings = document.querySelector('.button__settings');


function switchHomePage(element, name) {
    hideHomePages();
    localStorage.setItem("current__page", name);
    element.style.display = 'flex';
}

buttonHome.addEventListener('click', (e) => {
    switchHomePage(homeWrapper, 'home');
    textHeader.innerText = 'Main'
})

buttonCharacter.addEventListener('click', (e) => {
    switchHomePage(characterWrapper, 'character');
    textHeader.innerText = 'Character'
})

buttonSettings.addEventListener('click', (e) => {
    switchHomePage(settingsWrapper, 'settings');
    textHeader.innerText = 'Settings'
})