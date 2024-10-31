// Array das imagens das cartas
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];

// Tabuleiro, tempo e pontuação
const gameBoard = document.getElementById('game-board');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let time = 0;
let score = 0; // Declare a variável score
let timer;

// Embaralhar as imagens, duplicando para criar pares
function shuffleImages() {
    return [...images, ...images].sort(() => 0.5 - Math.random());
}

// Cria as cartas no tabuleiro com as imagens embaralhadas
function createCards() {
    const shuffledImages = shuffleImages();
    gameBoard.innerHTML = '';
    shuffledImages.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = `/Exercicios Intermediarios/Jogo da Memória/Img/${image}`; // Corrija o caminho aqui
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Iniciar o cronômetro
function startTimer() {
    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = `Tempo: ${time}s`;
    }, 1000);
}

// Função de virar carta
function flipCard() {
    if (!timer) startTimer();

    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificação de cartas iguais
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedCards += 2;
        score += 10;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        flippedCards = [];
        if (matchedCards === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert(`Você ganhou! Tempo: ${time}s, Pontuação: ${score}`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Função de reiniciar o jogo, resetando todas as informações
function restartGame() {
    clearInterval(timer);
    timer = null;
    time = 0;
    score = 0;
    matchedCards = 0;
    flippedCards = [];
    timeDisplay.textContent = `Tempo: ${time}s`;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    cards = [];
    createCards();
}

// Inicia um novo jogo
createCards();
