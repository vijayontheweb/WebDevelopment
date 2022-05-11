const p1 = {
    score: 0,
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1Button')
};

const p2 = {
    score: 0,
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2Button')
};

const resetButton = document.querySelector('#resetButton');
const targetScoreSelect = document.querySelector('#targetScore');

let targetScore = 3;
let isGameOver = false;

targetScoreSelect.addEventListener('change', function () {
    targetScore = parseInt(this.value);
    reset();
});

p1.button.addEventListener('click', function () {
    updateScore(p1, p2)
});

p2.button.addEventListener('click', function () {
    updateScore(p2, p1)
});

function updateScore(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === targetScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}


resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}