// ================================
// CONFIGURATION
// ================================

const ROWS = 10;
const COLS = 5;
const TOTAL_CELLS = ROWS * COLS;

const APPLES_PER_ROUND = 10;

// ================================
// ELEMENTS
// ================================

const grid = document.getElementById("grid");
const multipliers = document.getElementById("multipliers");

const revealBtn = document.getElementById("revealBtn");
const resetBtn = document.getElementById("resetBtn");

const revealedText = document.getElementById("revealed");
const totalText = document.getElementById("total");

// ================================
// VARIABLES
// ================================

let cells = [];
let applePattern = [];
let revealed = 0;

// ================================
// CREATION DES CASES
// ================================

function createGrid() {

    grid.innerHTML = "";
    cells = [];

    for (let i = 0; i < TOTAL_CELLS; i++) {

        const cell = document.createElement("div");

        cell.className = "cell";

        cell.textContent = "";

        grid.appendChild(cell);

        cells.push(cell);
    }

}

// ================================
// MULTIPLICATEURS
// ================================

const odds = [
    "x349.68",
    "x69.93",
    "x27.97",
    "x11.18",
    "x6.71",
    "x4.02",
    "x2.41",
    "x1.93",
    "x1.53",
    "x1.23"
];

function createMultipliers() {

    multipliers.innerHTML = "";

    // Affichage du haut vers le bas
    for (let i = 0; i < odds.length; i++) {

        const item = document.createElement("div");

        item.className = "multiplier";

        item.textContent = odds[i];

        multipliers.appendChild(item);

    }

}
// ================================
// GENERATION
// ================================

function generatePattern() {

    applePattern = [];

    // On part de la dernière ligne vers la première
    for (let row = ROWS - 1; row >= 0; row--) {

        const column = Math.floor(Math.random() * COLS);

        const index = row * COLS + column;

        applePattern.push(index);
    }

}

// ================================
// MAJ COMPTEUR
// ================================

function updateCounter() {

    revealedText.textContent = revealed;
    totalText.textContent = APPLES_PER_ROUND;

}

// ================================
// REVELER
// ================================

function revealNext() {

    if (revealed >= applePattern.length)
        return;

    const index = applePattern[revealed];

    const cell = cells[index];

    cell.classList.add("revealed");

    cell.textContent = "🍎";

    revealed++;

    updateCounter();

    updateMultiplier();

}

// ================================
// MULTIPLICATEUR ACTIF
// ================================

function updateMultiplier() {

    const all = document.querySelectorAll(".multiplier");

    all.forEach(item => item.classList.remove("active"));

    if (revealed === 0) return;

    // Le premier clic correspond à la dernière cote
    const index = odds.length - revealed;

    if (index >= 0) {

        all[index].classList.add("active");

    }

}

// ================================
// RESET
// ================================

function newRound() {

    revealed = 0;

    createGrid();

    generatePattern();

    updateCounter();

    updateMultiplier();

}

// ================================
// BOUTONS
// ================================

revealBtn.addEventListener("click", revealNext);

resetBtn.addEventListener("click", newRound);

// ================================
// INITIALISATION
// ================================

createGrid();

createMultipliers();

generatePattern();

updateCounter();