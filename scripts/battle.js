
const characterBattleName = document.querySelector('.character__fight-name')
const characterAvatarImage = document.querySelector('.character__fight-avatar')
const characterCurrentHpText = document.querySelector('.character__hp-current')
const characterTotalHpText = document.querySelector('.character__hp-total')
const characterHpBar = document.querySelector('.character__fight-hp-red')
const characterTotalHp = document.querySelector('.character__hp-total')


const enemyBattleName = document.querySelector('.enemy__fight-name')
const enemyAvatarImage = document.querySelector('.enemy__fight-avatar')
const enemyCurrentHpText = document.querySelector('.enemy__hp-current')
const enemyTotalHpText = document.querySelector('.enemy__hp-total')
const enemyHpBar = document.querySelector('.enemy__fight-hp-red')
const enemyTotalHp = document.querySelector('.enemy__hp-total')

const attackButtons = document.querySelectorAll('input[name="attack"]');
const defenceButtons = document.querySelectorAll('input[name="defence__name"]');

const attackButton = document.querySelector('.button__attack');
// Добавить последние выбранные цели
let enemyDataLocal

function returnNewHealth(newHealth, total) {
    return `${newHealth / (total / 100)}%`
}

function returnPlayerTotalHp(XP) {
    return Number(XP * 30)
}

function restoreBattle() {
    const parsedData = localStorage.getItem('currentBattle') ? JSON.parse(localStorage.getItem('currentBattle')) : false;

    if (parsedData && parsedData.inNewBattle) {
        // localStorage.clear('currentBattle')
        characterBattleName.innerText = playerName;
        characterAvatarImage.style.backgroundImage = `url(../assets/avatars/${currentAvatar}.png)`;
        characterHpBar.style.width = returnNewHealth(parsedData.currentPlayerHP, returnPlayerTotalHp(parsedData.playerXP))
        characterCurrentHpText.innerText = parsedData.currentPlayerHP
        characterTotalHpText.innerText = 150

        const enemyName = parsedData.currentEnemy
        const enemyData = enemyProfiles[enemyName];
        enemyDataLocal = enemyProfiles[enemyName]

        enemyBattleName.innerText = enemyData.name;
        enemyAvatarImage.style.backgroundImage = `url(../assets/enemies/${parsedData.currentEnemy}.png)`;
        enemyHpBar.style.width = returnNewHealth(parsedData.currentEnemyHP, enemyDataLocal.profile.hp)
        enemyCurrentHpText.innerText = parsedData.currentEnemyHP
        enemyTotalHpText.innerText = enemyData.profile.hp
    } else {
        switchHomePage(homeWrapper, 'home');
        textHeader.innerText = 'Main'
    }
}

restoreBattle()

function setupBattle(enemy) {
    const enemyData = enemyProfiles[enemy];

    const battleData = {
        inNewBattle: true,
        currentPlayerHP: 150,
        currentEnemyHP: enemyData.profile.hp,
        currentEnemy: enemy,
        playerXP: 5
    }

    localStorage.setItem('currentBattle', JSON.stringify(battleData))
    restoreBattle()
}

let enemy

for (let i = 0; i < attackButtons.length; i++) {
    attackButtons[i].addEventListener("click", (e) => {
        localStorage.setItem('playerSelectedAttackZone', e.target.value)
        enableButton();
        localStorage.setItem('playerSelectedAttackZone', String(e.target.value))
    });
}

function enableButton() {
    const playerAttackTarget = localStorage.getItem('playerSelectedAttackZone')
    const playerDefenceTarget = localStorage.getItem('playerSelectedDefenceZone') ? JSON.parse(localStorage.getItem('playerSelectedDefenceZone')) : false

    if (playerAttackTarget !== '' && playerDefenceTarget.length === 2) {
        attackButton.disabled = false
    } else {
        attackButton.disabled = true
    }
}
enableButton()

function restoreZoneButtons() {
    const playerAttackTarget = localStorage.getItem('playerSelectedAttackZone')
    const playerDefenceTarget = localStorage.getItem('playerSelectedDefenceZone') ? JSON.parse(localStorage.getItem('playerSelectedDefenceZone')) : false

    if (playerAttackTarget) {
        for (let i = 0; i < attackButtons.length; i++) {
            if (playerAttackTarget.includes(attackButtons[i].value)) {
                attackButtons[i].checked = true
            }
        }
    }


    if (playerDefenceTarget) {

        for (let i = 0; i < defenceButtons.length; i++) {
            if (playerDefenceTarget.includes(defenceButtons[i].value)) {
                defenceButtons[i].checked = true
            }
        }
    }

}
restoreZoneButtons()


for (let i = 0; i < defenceButtons.length; i++) {
    defenceButtons[i].addEventListener("click", (e) => {
        let playerSelectedDefenceZones = localStorage.getItem('playerSelectedDefenceZone') ? JSON.parse(localStorage.getItem('playerSelectedDefenceZone')) : []
        const isChecked = e.target.checked;
        const part = e.target.value;
        if (!isChecked) {
            playerSelectedDefenceZones = playerSelectedDefenceZones.filter((item) => item !== part);
        } else {
            playerSelectedDefenceZones.push(part)
        }

        localStorage.setItem('playerSelectedDefenceZone', JSON.stringify(playerSelectedDefenceZones))

        enableButton()
    });
}

function isCrit() {
    const roll = Math.floor(Math.random() * 100)
    if (roll > 50) {
        return true
    } else {
        return false
    }
}






attackButton.addEventListener('click', (e) => {
    // End Rounds
    calculateRound()
})


startBattleButton.addEventListener('click', (e) => {
    // Fight starts 
    const enemiesArray = ['HilichurlBerserker', 'HydroAbyssMage', 'Kairagi', 'RockfondRifthound', 'RuinDrake', 'SuppressionMek', 'Mitachurl']
    const id = Math.floor(Math.random() * enemiesArray.length) + 1
    enemy = enemiesArray[id - 1]
    setupBattle(enemy);
    switchHomePage(battleWrapper, 'battle');
})



