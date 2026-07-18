
const avatarList = document.querySelector('.avatar__list')
const closeAvatarList = document.querySelectorAll('.close__avatar')
const selectionCover = document.querySelector('.avatar__selection-cover')

let tempAvatarName;

if (currentPage === 'character') {
    goToCharacterPage();
} else {
    characterWrapper.style.display = 'none';
}

avatarList.addEventListener('wheel', (event) => {
    event.preventDefault();
    avatarList.scrollLeft += event.deltaY;
}, { passive: false });

function cleanSelectedCards() {
    const shadows = document.querySelectorAll('.cover__avatar');
    shadows.forEach(item => {
        item.style.display = 'none';
    });
}

const cardList = ['Albedo', 'Alhaitham', 'AratakiItto', 'Neuvillette', 'Xiao']

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
            tempAvatarName = cardList[i]
        })
        avatarList.append(card)
    }
}

fillCards();

switchCharacter.addEventListener('click', (e) => {
    selectionCover.style.display = 'flex'
})

switchCharacter.style.backgroundImage = `url(../assets/avatars/${currentAvatar}.png)`

function switchAvatars() {
    switchCharacter.style.backgroundImage = `url(../assets/avatars/${tempAvatarName}.png)`
    localStorage.setItem('currentAvatar', tempAvatarName)
    currentAvatar = tempAvatarName
}


for (let i = 0; i < closeAvatarList.length; i++) {
    closeAvatarList[i].addEventListener('click', (e) => {
        if (e.target.classList.contains('close__avatar-selection') || e.target.classList.contains('avatar__selection-cover')) {
            cleanSelectedCards();
            selectionCover.style.display = 'none';
            if (tempAvatarName) {
                switchAvatars()
            }
        }
    })
}
