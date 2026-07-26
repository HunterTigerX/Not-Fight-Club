const startBattleButton = document.querySelector('.start__battle');
const battleWrapper = document.querySelector('.battle__wrapper');
const homeWrapper = document.querySelector('.home__main');
const characterWrapper = document.querySelector('.character__main');
const settingsWrapper = document.querySelector('.settings__list')
const textHeader = document.querySelector('.text__header');


const homePagesArray = ['home', 'character', 'settings', 'battle']


function selectHomePage(page) {
    if (page === 'settings') {
        settingsWrapper.style.display = 'flex';
        textHeader.innerText = 'Settings'
    } else if (page === 'home') {
        homeWrapper.style.display = 'flex';
        textHeader.innerText = 'Main'
    } else if (page === 'character') {
        characterWrapper.style.display = 'flex';
        textHeader.innerText = 'Character'
    } else if (page === 'battle') {
        battleWrapper.style.display = 'flex';
        textHeader.innerText = 'Battle'
    }
}

function hideMainElements() {
    if (mainList) {
        Array.from(mainList.children).forEach(child => {
            child.style.display = 'none';
        });
    }
}

if (homePagesArray.includes(currentPage)) {
    hideMainElements();
    homeWrapperBig.style.display = 'flex';
    hideHomePages();
    selectHomePage(currentPage)
} else {
    homeWrapperBig.style.display = 'none';
}
