const registrationWrapperBig = document.querySelector('.registration__wrapper-big');
const registrationButton = document.querySelector('.registration__button');
const registrationInput = document.querySelector('.registration__input');
const homeWrapperBig = document.querySelector('.home__wrapper-big');

const currentPage = localStorage.getItem("current__page");

if (currentPage === 'registration' || !currentPage) {
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
        registrationWrapperBig.style.display = "none";
        homeWrapperBig.style.display = "flex";
    }
})