const enemiesArray = ['HilichurlBerserker', 'HydroAbyssMage', 'Kairagi', 'RockfondRifthound', 'RuinDrake', 'SuppressionMek', 'Mitachurl']

const characterBattleName = document.querySelector('.character__fight-name')
const characterAvatarImage = document.querySelector('.character__fight-avatar')
const characterCurrentHpBar = document.querySelector('.character__fight-hp-gray')
const characterCurrentHpText = document.querySelector('.character__hp-current')
const characterTotalHpText = document.querySelector('.character__hp-total')
const characterTotalHp = document.querySelector('.character__hp-total')


const enemyBattleName = document.querySelector('.enemy__fight-name')
const enemyAvatarImage = document.querySelector('.enemy__fight-avatar')
const enemyCurrentHpBar = document.querySelector('.enemy__fight-hp-gray')
const enemyCurrentHpText = document.querySelector('.enemy__hp-current')
const enemyTotalHpText = document.querySelector('.enemy__hp-total')
const enemyTotalHp = document.querySelector('.enemy__hp-total')


characterBattleName.innerText = playerName;
characterAvatarImage.style.backgroundImage = `url(../assets/avatars/${currentAvatar}.png)`;
characterCurrentHpBar.style.width = "100%"
characterCurrentHpText.innerText = 150
characterTotalHpText.innerText = 150

enemyBattleName.innerText = playerName;
enemyAvatarImage.style.backgroundImage = `url(../assets/avatars/${currentAvatar}.png)`;
enemyCurrentHpBar.style.width = "100%"
enemyCurrentHpText.innerText = 150
enemyTotalHpText.innerText = 150


fightButton.addEventListener('click', (e) => {
    switchHomePage(battleWrapper, 'battle');


    card.style.backgroundImage = `url(../assets/avatars/${cardList[i]}.png)`
})


