const showBattleMessage = document.querySelector('.battle__message-wrapper');
const battleMessage = document.querySelector('.battle__message');
const closeBattleMessage = document.querySelectorAll('.close-message');



for (let i = 0; i < closeBattleMessage.length; i++) {
    closeBattleMessage[i].addEventListener('click', (e) => {
        if (e.target.classList.contains('battle__message-wrapper') || e.target.classList.contains('battle__message-close')) {
            goToCharacterPage();
            showBattleMessage.style.display = 'none';
        }
    })
}



function refreshStats(wins, loses, draws) {
    const playerStats = localStorage.getItem('playerStats') ? JSON.parse(localStorage.getItem('playerStats')) : false
    let newPlayerStats

    if (playerStats) {
        newPlayerStats = {
            wins: playerStats.wins + wins,
            loses: playerStats.loses + loses,
            draws: playerStats.draws + draws
        }
    } else {
        newPlayerStats = {
            wins,
            loses,
            draws
        }
    }
    return JSON.stringify(newPlayerStats)
}

function endBattle(status) {
    showBattleMessage.style.display = 'flex';
    if (status === 'Draw') {
        battleMessage.innerText = 'Draw!'
    } else if (!status) {
        battleMessage.innerText = 'Defeat!'
    } else if (status) {
        battleMessage.innerText = 'Victory!'
    }
    const battleData = localStorage.getItem('currentBattle') ? JSON.parse(localStorage.getItem('currentBattle')) : false
    if (battleData) {
        battleData.inNewBattle = false;
        battleData.currentPlayerHP = 150;
        battleData.currentEnemy = false;
        localStorage.setItem('currentBattle', JSON.stringify(battleData))
    }

}

function calculateRound() {

    if (enemyDataLocal) {
        const enemyAttackZones = ['Head', 'Neck', 'Body', 'Belly', 'Legs']
        const enemyDefenceZones = ['Head', 'Neck', 'Body', 'Belly', 'Legs']
        const numberOfEnemyAttackZones = enemyDataLocal.profile.attackZones
        const numberOfEnemyBlockZones = enemyDataLocal.profile.blockZones

        let enemySelectedAttackZones = [];
        let enemySelectedDefenceZones = [];

        for (let i = 0; i < numberOfEnemyAttackZones; i++) {
            const randomNumber = Math.floor(Math.random() * enemyAttackZones.length)
            enemySelectedAttackZones.push(...enemyAttackZones.splice(randomNumber, 1))
        }

        for (let i = 0; i < numberOfEnemyBlockZones; i++) {
            const randomNumber = Math.floor(Math.random() * enemyDefenceZones.length)
            enemySelectedDefenceZones.push(...enemyDefenceZones.splice(randomNumber, 1))
        }

        const battleData = localStorage.getItem('currentBattle');
        if (battleData) {

            const parsedData = JSON.parse(battleData)


            const playerAttackTarget = localStorage.getItem('playerSelectedAttackZone')

            const isPlayersAttackCrit = isCrit();
            let playerSelectedDefenceZones = localStorage.getItem('playerSelectedDefenceZone') ? JSON.parse(localStorage.getItem('playerSelectedDefenceZone')) : []

            if (isPlayersAttackCrit) {
                parsedData.currentEnemyHP = parsedData.currentEnemyHP - (parsedData.playerXP * 2) * 1.5

            } else {
                if (!enemySelectedDefenceZones.includes(playerAttackTarget)) {
                    parsedData.currentEnemyHP = parsedData.currentEnemyHP - parsedData.playerXP * 2

                }
            }

            for (let i = 0; i < enemySelectedAttackZones.length; i++) {
                if (isCrit()) {
                    parsedData.currentPlayerHP -= 15;
                } else {
                    if (!playerSelectedDefenceZones.includes(enemySelectedAttackZones[i])) {
                        parsedData.currentPlayerHP -= 10
                    }
                }
            }


            if (parsedData.currentPlayerHP <= 0 && parsedData.currentEnemyHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(0, 0, 1))
                endBattle('Draw')
            }
            else if (parsedData.currentPlayerHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(0, 1, 0))
                endBattle(true)
            } else if (parsedData.currentEnemyHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(1, 0, 0))
                endBattle(false)
            } else {
                localStorage.setItem('currentBattle', JSON.stringify(parsedData))
                restoreBattle()

            }
        }
    }
}