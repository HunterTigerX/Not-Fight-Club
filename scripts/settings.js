
const playerInputValue = document.querySelector('.player__name')
const editName = document.querySelector('.edit__name')
playerInputValue.value = playerName;

editName.addEventListener('click', (e) => {

    if (editName.innerText === 'Edit') {
        playerInputValue.disabled = false
        editName.innerText = 'Save';
    } else {
        if (playerInputValue.value.trim() === '') {
            alert('Field cannot be empty')
        } else {
            localStorage.setItem("player__name", playerInputValue.value)
            playerInputValue.disabled = true
            editName.innerText = 'Edit'
        }
    }
})