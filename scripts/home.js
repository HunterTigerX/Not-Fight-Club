const playerName = localStorage.getItem("player__name");
const mainList = document.querySelector('.main');
const homePage = document.querySelector('.main__pages');
const fightButton = document.querySelector('.home__button');
const battleWrapper = document.querySelector('.battle__wrapper');
const homeWrapper = document.querySelector('.home__main');
const characterWrapper = document.querySelector('.character__main');
const settingsWrapper = document.querySelector('.settings__list')
const textHeader = document.querySelector('.text__header');


const homePagesArray = ['home', 'character', 'settings', 'battle']

function hideMainElements() {
    if (mainList) {
        Array.from(mainList.children).forEach(child => {
            child.style.display = 'none';
        });
    }
}


function hideHomePages() {
    if (homePage) {
        Array.from(homePage.children).forEach(child => {
            child.style.display = 'none';
        });
    }
}

function selectHomePage(page) {
    if (page === 'settings') {
        settingsWrapper.style.display = 'flex';
        textHeader.innerText = 'Settings'
    } else if (page === 'home') {
        console.log('Home')
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

if (homePagesArray.includes(currentPage)) {
    hideMainElements();
    homeWrapperBig.style.display = 'flex';
    hideHomePages();
    selectHomePage(currentPage)
} else {
    console.log('Not home')
    homeWrapperBig.style.display = 'none';
}
