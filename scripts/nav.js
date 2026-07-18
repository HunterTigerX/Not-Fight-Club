const buttonHome = document.querySelector('.button__home');
const buttonCharacter = document.querySelector('.button__character');
const buttonSettings = document.querySelector('.button__settings');
const wins = document.querySelector('.wins__counter');
const loses = document.querySelector('.loses__counter');
const draws = document.querySelector('.draws__counter');


function switchHomePage(element, name) {
    hideHomePages();
    localStorage.setItem("current__page", name);
    element.style.display = 'flex';
}

buttonHome.addEventListener('click', (e) => {
    switchHomePage(homeWrapper, 'home');
    textHeader.innerText = 'Main'
})

function updateStats() {
    const playerStats = localStorage.getItem('playerStats') ? JSON.parse(localStorage.getItem('playerStats')) : false
    if (playerStats) {
        wins.innerText = playerStats.wins
        loses.innerText = playerStats.loses
        draws.innerText = playerStats.draws
    } else {
        wins.innerText = 0
        loses.innerText = 0
        draws.innerText = 0
    }
}
updateStats()

function goToCharacterPage() {
    switchHomePage(characterWrapper, 'character');
    textHeader.innerText = 'Character'
    updateStats()
}

buttonCharacter.addEventListener('click', (e) => {
    goToCharacterPage()
})

buttonSettings.addEventListener('click', (e) => {
    switchHomePage(settingsWrapper, 'settings');
    textHeader.innerText = 'Settings'
})