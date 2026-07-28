const mainList = document.querySelector('.main');
const registrationWrapperBig = document.querySelector('.registration__wrapper-big');
const registrationButton = document.querySelector('.registration__button');
const registrationInput = document.querySelector('.registration__input');
const homeWrapperBig = document.querySelector('.home__wrapper-big');
const playerInputValue = document.querySelector('.player__name')
const homePage = document.querySelector('.main__pages');
const switchCharacter = document.querySelector('.character__avatar')

let currentAvatar = localStorage.getItem('currentAvatar')
let playerName = localStorage.getItem("player__name");
let currentPage = localStorage.getItem("current__page");


if (!currentAvatar || !playerName) {
    currentPage = 'registration'
    homeWrapperBig.style.display = 'none';
    registrationWrapperBig.style.display = 'flex';
} else {
    registrationWrapperBig.style.display = 'none';
}


function hideHomePages() {
    if (homePage) {
        Array.from(homePage.children).forEach(child => {
            child.style.display = 'none';
        });
    }
}

function switchHomePage(element, name) {
    hideHomePages();
    localStorage.setItem("current__page", name);
    element.style.display = 'flex';
}

registrationButton.addEventListener('click', (e) => {
    if (registrationInput.value.trim() == '') {
        alert("Your name must not be empty")
    } else {
        localStorage.setItem("player__name", registrationInput.value);
        localStorage.setItem('currentAvatar', 'Neuvillette')
        playerName = registrationInput.value;
        currentAvatar = 'Neuvillette'
        registrationWrapperBig.style.display = "none";
        homeWrapperBig.style.display = "flex";
        playerInputValue.value = registrationInput.value.trim()
        switchHomePage(homeWrapper, 'home');
        textHeader.innerText = 'Main'
    }
})