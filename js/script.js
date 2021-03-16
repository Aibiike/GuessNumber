let button = document.querySelector('.guessSubmit')
let lastGuesses = document.querySelector('.guesses')
let lastResult = document.querySelector('.LastResult')
let LowOrHi = document.querySelector('.LowOrHi')
let guessField = document.querySelector('#guessField')

let guesses = 1 // Создаем переменную которая отвечает за кол-во попыток
let randomNumber = Math.floor(Math.random() * 100) + 1  // генерируем случайное число от 1 до 100
let resetButton
console.log(randomNumber)


function checkGuess() {
    if (guessField.value.length > 0){
        let userGuess = Number(guessField.value) //Создаем переменную в которую записываются значение нового инпута
        if(guesses === 1){
            lastGuesses.textContent = 'Предыдущие предположения: '
        }
        lastGuesses.textContent += userGuess + " "
        if (userGuess === randomNumber) { // если угадали число
            lastResult.textContent = 'Поздравляем вы угадали число'
            lastResult.style.backgroundColor = 'green'
            LowOrHi.textContent = ''
            setGameOver()
        } else if (guesses === 10) { // Есл и кол-во попыток больше 10
            lastResult.textContent = 'Игра окончена! Превышено количество попыток'
            button.disabled = true
            setGameOver()
        } else { // если не угадали число
            lastResult.textContent = 'Неправильно'
            lastResult.style.backgroundColor = 'red'
            if (userGuess - randomNumber <= 5 && userGuess - randomNumber > -5) { // Если вы близки к загаданному числу
                LowOrHi.textContent = 'Вы близко'
            } else if (userGuess > 100) { // Если число которое мы ввели больше 100
                LowOrHi.textContent = 'Вы ввели число больше 100'
            } else if (userGuess < 0) {   //Если число которое мы ввели меньше 0
                LowOrHi.textContent = 'Вы ввели число меньше 0'
            } else { // Если мы близки к загаданному числу
                LowOrHi.textContent = 'Холодно'
            }

        }
        guesses++ //Увеличиваем кол-во попыток на 1
    }
}
function setGameOver(){
    guessField.disabled = true//Выключаем ипут
    button.disabled = true//Выключаем кнопку
    resetButton = document.createElement('button') //Создаем переменную в котором создаем ногвую кнопку
    resetButton.textContent = 'Начать новую игру'//В значение  этой кнопки записываем Начать новую игру
    resetButton.classList.add('resetBtn')
    document.querySelector('.container').appendChild(resetButton) //Помещаем данную кнопку в body через appendChild
    resetButton.addEventListener('click',resetGame)//Навешиваем на кнопку событие клика при котором выполнится функция
}

function resetGame(){
    guesses = 1
    lastResult.textContent = ''
    lastGuesses.textContent = ''
    LowOrHi.textContent = ''
    guessField.disabled = false
    button.disabled = false
    lastResult.style.backgroundColor = 'white'
    resetButton.parentNode.removeChild(resetButton)
}
button.addEventListener('click', () => {
    checkGuess()
    guessField.value = ''
})