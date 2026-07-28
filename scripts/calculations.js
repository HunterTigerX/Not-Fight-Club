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

    localStorage.removeItem("lastMessage");
    localStorage.removeItem('currentBattle');
}

function writeReport(attacker, defendant, part, result) {
    const body = document.createElement('div')
    let endText

    if (result) {
        if (result === 15) {
            endText = `and deal <span class="bold damage">${result} crit damage.</span>`
        } else {
            endText = `and deal <span class="bold damage">${result} damage.</span>`
        }
    } else {
        endText = `but <span class="bold damage">${defendant}</span> was able to protect his <span class="bold">${part}</span>`
    }

    body.insertAdjacentHTML('beforeend', `
                        <span class="bold">${attacker}</span>
                        <span>attacked</span>
                        <span class="bold">${defendant}</span>
                        <span>to</span>
                        <span class="bold part">${part}</span>
                        <span> </span>
                        ${endText}
                    `);
    battleFooter.append(body)
}

function calculateRound() {

    if (enemyDataLocal) {
        const report = document.createElement('div')

        const enemyAttackZones = ['head', 'neck', 'body', 'belly', 'legs']
        const enemyDefenceZones = ['head', 'neck', 'body', 'belly', 'legs']
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
                const damageDone = (parsedData.playerXP * 2) * 1.5;
                parsedData.currentEnemyHP = parsedData.currentEnemyHP - damageDone
                writeReport(characterBattleName.innerText, enemyBattleName.innerText, playerAttackTarget, damageDone)
            } else {
                if (!enemySelectedDefenceZones.includes(playerAttackTarget)) {
                    const damageDone = (parsedData.playerXP * 2);
                    parsedData.currentEnemyHP = parsedData.currentEnemyHP - damageDone
                    writeReport(characterBattleName.innerText, enemyBattleName.innerText, playerAttackTarget, damageDone)
                } else {
                    writeReport(characterBattleName.innerText, enemyBattleName.innerText, playerAttackTarget, false)
                }
            }

            for (let i = 0; i < enemySelectedAttackZones.length; i++) {
                if (isCrit()) {
                    if ((parsedData.currentPlayerHP - 15) <= 0) {
                        parsedData.currentPlayerHP = 0
                    } else {
                        parsedData.currentPlayerHP -= 15
                    }
                    writeReport(enemyBattleName.innerText, characterBattleName.innerText, enemySelectedAttackZones[i], 15)
                } else {

                    if (!playerSelectedDefenceZones.map(item => item.toLowerCase()).includes(enemySelectedAttackZones[i].toLowerCase())) {
                        if ((parsedData.currentPlayerHP - 10) <= 0) {
                            parsedData.currentPlayerHP = 0
                        } else {
                            parsedData.currentPlayerHP -= 10
                        }
                        writeReport(enemyBattleName.innerText, characterBattleName.innerText, enemySelectedAttackZones[i], 10)
                    } else {
                        writeReport(enemyBattleName.innerText, characterBattleName.innerText, enemySelectedAttackZones[i], false)
                    }
                }
            }
            localStorage.setItem("current__page", "home");
            localStorage.setItem('lastMessage', battleFooter.innerHTML);
            localStorage.setItem('currentBattle', JSON.stringify(parsedData))
            restoreBattle()

            if (parsedData.currentPlayerHP <= 0 && parsedData.currentEnemyHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(0, 0, 1))
                endBattle('Draw')
            }
            else if (parsedData.currentPlayerHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(0, 1, 0))
                endBattle(false)
            } else if (parsedData.currentEnemyHP <= 0) {
                localStorage.setItem('playerStats', refreshStats(1, 0, 0))
                endBattle(true)
            }
        }
    }
}