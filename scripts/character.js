const characterPageName = document.querySelector('.character__stats-name')
const switchCharacter = document.querySelector('.character__avatar')
const avatarList = document.querySelector('.avatar__list')
const closeAvatarList = document.querySelector('.close__avatar-selection')
const selectionCover = document.querySelector('.avatar__selection-cover')
const currentAvatar = localStorage.getItem('currentAvatar')

let tempAvatarLink;

if (currentPage === 'character') {
    characterWrapper.style.display = 'flex';
} else {
    characterWrapper.style.display = 'none';
}

if (playerName) {
    characterPageName.innerText = playerName;
}

function cleanSelectedCards() {
    const shadows = document.querySelectorAll('.cover__avatar');
    shadows.forEach(item => {
        item.style.display = 'none';
    });
}

const cardList = ['Albedo', 'Alhaitham', 'AratakiItto', 'Neuvillette', 'Xiao']

if (currentAvatar) {
    switchCharacter.style.backgroundImage = `url(../assets/avatars/${currentAvatar}.png)`
}


function fillCards() {
    for (let i = 0; i < cardList.length; i++) {
        const card = document.createElement('div');
        card.classList.add('avatar__selector');
        card.style.backgroundImage = `url(../assets/avatars/${cardList[i]}.png)`

        const cover = document.createElement('div');
        cover.classList.add('cover__avatar');
        const selected = document.createElement('div');
        selected.classList.add('cover__selected');
        cover.append(selected)
        selected.innerText = '✔️'
        card.append(cover)




        card.addEventListener('click', (e) => {
            cleanSelectedCards();
            card.children[0].style.display = 'flex';
            tempAvatarLink = cardList[i]
        })
        avatarList.append(card)
    }
}

fillCards();

switchCharacter.addEventListener('click', (e) => {
    selectionCover.style.display = 'flex'
})

closeAvatarList.addEventListener('click', (e) => {
    cleanSelectedCards();
    selectionCover.style.display = 'none';
    if (tempAvatarLink) {
        switchCharacter.style.backgroundImage = `url(../assets/avatars/${tempAvatarLink}.png)`
        localStorage.setItem('currentAvatar', tempAvatarLink)
    }
})