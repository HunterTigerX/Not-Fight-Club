const mainList = document.querySelector('.main');
const registrationWrapperBig = document.querySelector('.registration__wrapper-big');
const registrationButton = document.querySelector('.registration__button');
const registrationInput = document.querySelector('.registration__input');
const homeWrapperBig = document.querySelector('.home__wrapper-big');
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

registrationButton.addEventListener('click', (e) => {
    if (registrationInput.value.trim() == '') {
        alert("Your name must not be empty")
    } else {
        localStorage.setItem("player__name", registrationInput.value);
        localStorage.setItem("current__page", 'home');
        localStorage.setItem('currentAvatar', 'Neuvillette')
        registrationWrapperBig.style.display = "none";
        homeWrapperBig.style.display = "flex";
    }
})