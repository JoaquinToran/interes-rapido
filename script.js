// Variables del juego
let currentPlayer = 0;
let players = [];
let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;
let failedAttempts = 0;

// Elementos del DOM
const loadingScreen = document.getElementById('loading-screen');
const gameContainer = document.getElementById('game-container');
const playerForm = document.getElementById('player-form');
const gameBoard = document.getElementById('game-board');
const challengeCard = document.getElementById('challenge-card');
const playerNameDisplay = document.getElementById('player-name');
const timerDisplay = document.getElementById('time-left');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

// Configuración del tablero
const boardSpaces = 30;
for (let i = 0; i < boardSpaces; i++) {
    const space = document.createElement('div');
    space.classList.add('space');
    space.innerText = i + 1;
    gameBoard.appendChild(space);
}

// Desafíos financieros
const challenges = [
    { type: 'simple', question: "Invertiste 500€ en una cuenta de ahorros con un interés simple anual del 5% durante 3 años. ¿Cuánto dinero tendrás al final?", answer: 575 },
    { type: 'simple', question: "Invertiste 300€ en una cuenta de ahorros con un interés simple anual del 6% durante 4 años. ¿Cuánto dinero tendrás al final?", answer: 372 },
    { type: 'simple', question: "Invertiste 800€ en una cuenta de ahorros con un interés simple anual del 3% durante 2 años. ¿Cuánto dinero tendrás al final?", answer: 848 },
    { type: 'simple', question: "Invertiste 1000€ en una cuenta de ahorros con un interés simple anual del 4% durante 5 años. ¿Cuánto dinero tendrás al final?", answer: 1200 },
    { type: 'compound', question: "Invertiste 1000€ en un fondo con un interés compuesto anual del 4% durante 2 años. ¿Cuánto dinero tendrás al final?", answer: 1081.60 },
    { type: 'compound', question: "Invertiste 800€ en un fondo con un interés compuesto anual del 5% durante 3 años. ¿Cuánto dinero tendrás al final?", answer: 926.10 },
    { type: 'compound', question: "Invertiste 500€ en un fondo con un interés compuesto anual del 6% durante 4 años. ¿Cuánto dinero tendrás al final?", answer: 631.23 },
    { type: 'compound', question: "Invertiste 1500€ en un fondo con un interés compuesto anual del 3% durante 5 años. ¿Cuánto dinero tendrás al final?", answer: 1738.58 },
    { type: 'simple', question: "Un banco ofrece una tasa de interés simple del 4% anual. Si deseas tener 600€ después de 3 años, ¿cuánto necesitas invertir inicialmente?", answer: 500 },
    { type: 'simple', question: "¿Cuánto tiempo necesitas para que una inversión inicial de 400€ crezca a 520€ con un interés simple anual del 6%?", answer: 5 },
    { type: 'compound', question: "Invertiste 700€ en un fondo con un interés compuesto anual del 4%. ¿Cuánto dinero tendrás al final de 2 años?", answer: 755.52 },
    { type: 'compound', question: "Un banco ofrece una tasa de interés compuesto del 5% anual. Si deseas tener 1100€ después de 2 años, ¿cuánto necesitas invertir inicialmente?", answer: 1000 },
    { type: 'simple', question: "Invertiste 1200€ en una cuenta de ahorros con un interés simple anual del 3%. ¿Cuánto tiempo necesitas para tener 1440€?", answer: 4 },
    { type: 'compound', question: "Un fondo ofrece una tasa de interés compuesto del 4% anual. Si deseas tener 1400€ después de 4 años, ¿cuánto necesitas invertir inicialmente?", answer: 1192.62 },
    { type: 'simple', question: "¿Cuál será el interés ganado después de 3 años si inviertes 500€ a un interés simple anual del 5%?", answer: 75 },
    { type: 'compound', question: "Si deseas que tu inversión inicial de 800€ crezca a 960€ en 2 años con un interés compuesto anual, ¿cuál debe ser la tasa de interés?", answer: 9 },
    { type: 'simple', question: "Invertiste 600€ en una cuenta de ahorros con un interés simple anual del 7% durante 2 años. ¿Cuánto dinero tendrás al final?", answer: 684 },
    { type: 'simple', question: "Invertiste 400€ en una cuenta de ahorros con un interés simple anual del 4% durante 5 años. ¿Cuánto dinero tendrás al final?", answer: 480 },
    { type: 'simple', question: "Un banco ofrece una tasa de interés simple del 3% anual. Si deseas tener 515€ después de 1 año, ¿cuánto necesitas invertir inicialmente?", answer: 500 },
    { type: 'compound', question: "Un banco ofrece una tasa de interés compuesto del 6% anual. Si deseas tener 1060€ después de 1 año, ¿cuánto necesitas invertir inicialmente?", answer: 1000 },
    { type: 'compound', question: "Invertiste 900€ en un fondo con un interés compuesto anual del 5% durante 3 años. ¿Cuánto dinero tendrás al final?", answer: 1044.9 },
    { type: 'compound', question: "Un fondo ofrece una tasa de interés compuesto del 4% anual. Si deseas tener 1300€ después de 5 años, ¿cuánto necesitas invertir inicialmente?", answer: 1063.04 },
    { type: 'simple', question: "Invertiste 1000€ en una cuenta de ahorros con un interés simple anual del 2% durante 4 años. ¿Cuánto dinero tendrás al final?", answer: 1080 },
    { type: 'simple', question: "Un banco ofrece una tasa de interés simple del 5% anual. Si deseas tener 1050€ después de 1 año, ¿cuánto necesitas invertir inicialmente?", answer: 1000 },
    { type: 'compound', question: "Un banco ofrece una tasa de interés compuesto del 3% anual. Si deseas tener 1030€ después de 1 año, ¿cuánto necesitas invertir inicialmente?", answer: 1000 },
    { type: 'compound', question: "Invertiste 750€ en un fondo con un interés compuesto anual del 6% durante 2 años. ¿Cuánto dinero tendrás al final?", answer: 841.50 },
    { type: 'simple', question: "¿Cuánto tiempo necesitas para que una inversión inicial de 500€ crezca a 650€ con un interés simple anual del 5%?", answer: 6 },
    { type: 'simple', question: "Invertiste 350€ en una cuenta de ahorros con un interés simple anual del 4% durante 3 años. ¿Cuánto dinero tendrás al final?", answer: 406 },
    { type: 'compound', question: "Un banco ofrece una tasa de interés compuesto del 4% anual. Si deseas tener 1040€ después de 1 año, ¿cuánto necesitas invertir inicialmente?", answer: 1000 },
    { type: 'compound', question: "Invertiste 500€ en un fondo con un interés compuesto anual del 5% durante 2 años. ¿Cuánto dinero tendrás al final?", answer: 551.25 },
];

// Inicializar el juego
function initGame() {
    playerNameDisplay.innerText = players[currentPlayer].name; // Actualiza el nombre del jugador actual
    updateBoard();
    showChallenge();
    startTimer();
}

// Función para actualizar el tablero
function updateBoard() {
    const spaces = document.querySelectorAll('.space');
    spaces.forEach(space => space.classList.remove('active'));
    spaces[currentQuestionIndex].classList.add('active');
}

// Función para mostrar un desafío
function showChallenge() {
    const challenge = challenges[currentQuestionIndex];
    challengeCard.innerHTML = `
        <p>${challenge.question}</p>
        <input type="text" id="answer" placeholder="Tu respuesta">
        <button onclick="checkAnswer()">Enviar</button>
    `;
}

// Función para comprobar la respuesta
function checkAnswer() {
    const answer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = challenges[currentQuestionIndex].answer;
    if (answer === correctAnswer) {
        alert('¡Correcto! ¡Sigue así!');
        players[currentPlayer].score += 10;
        players[currentPlayer].correctAnswers += 1;
        document.querySelectorAll('.space')[currentQuestionIndex].innerText = players[currentPlayer].icon;
        if (players[currentPlayer].correctAnswers >= 16) {
            alert(players[currentPlayer].name + ' ha ganado el juego!');
            resetGame();
            return;
        }
        currentQuestionIndex = (currentQuestionIndex + 1) % boardSpaces;
        failedAttempts = 0;
    } else {
        alert('Incorrecto, ¡intenta la siguiente!');
        failedAttempts++;
        if (failedAttempts >= 2) {
            document.querySelectorAll('.space')[currentQuestionIndex].innerText = '❌';
            currentQuestionIndex = (currentQuestionIndex + 1) % boardSpaces;
            failedAttempts = 0;
        }
        currentPlayer = (currentPlayer + 1) % players.length;
        playerNameDisplay.innerText = players[currentPlayer].name; // Actualiza el nombre del jugador actual
    }
    updateScore();
    resetTimer();
    updateBoard();
    showChallenge();
}

// Función para actualizar la puntuación
function updateScore() {
    player1Score.innerHTML = `<div style="background-color: ${players[0].icon}; padding: 10px;">${players[0].name}: ${players[0].score}</div>`;
    player2Score.innerHTML = `<div style="background-color: ${players[1].icon}; padding: 10px;">${players[1].name}: ${players[1].score}</div>`;
}

// Función para manejar el siguiente turno
function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    playerNameDisplay.innerText = players[currentPlayer].name; // Actualiza el nombre del jugador actual
    resetTimer();
}

// Función para iniciar el temporizador
function startTimer() {
    timer = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Tiempo agotado! Turno del siguiente jugador.');
            nextTurn();
        }
    }, 1000);
}

// Función para reiniciar el temporizador
function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timerDisplay.innerText = timeLeft;
    startTimer();
}

// Función para reiniciar el juego
function resetGame() {
    players = [
        { name: players[0].name, icon: players[0].icon, score: 0, correctAnswers: 0 },
        { name: players[1].name, icon: players[1].icon, score: 0, correctAnswers: 0 }
    ];
    currentPlayer = 0;
    currentQuestionIndex = 0;
    updateScore();
    updateBoard();
    showChallenge();
    resetTimer();
}

// Manejar la pantalla de carga y la entrada de los jugadores
playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const player1Name = document.getElementById('player1-name').value;
    const player1Icon = document.getElementById('player1-icon').value;
    const player2Name = document.getElementById('player2-name').value;
    const player2Icon = document.getElementById('player2-icon').value;

    players = [
        { name: player1Name, icon: player1Icon, score: 0, correctAnswers: 0 },
        { name: player2Name, icon: player2Icon, score: 0, correctAnswers: 0 }
    ];

    loadingScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    player1Score.innerHTML = `<div style="background-color: ${player1Icon}; padding: 10px;">${player1Name}: ${players[0].score}</div>`;
    player2Score.innerHTML = `<div style="background-color: ${player2Icon}; padding: 10px;">${player2Name}: ${players[1].score}</div>`;

    initGame();
});
