const boxes = Array.from(document.getElementsByClassName("box"));
const label = document.getElementById("label");
const restartButton = document.getElementById("restart");
var gameOver = false;
var clickCount = 0;


function restart() {
    restartButton.style.display = "none";
    
    boxes.forEach(element => {
        element.textContent = "";
        element.style.pointEvents = "auto";
        element.style.backgroundColor = "#dadada";
        clickCount = 0;
        gameOver = false;
        label.textContent = "X's turn";
    });
}


function won(winner) {
    label.textContent = "Good game well played";
    restartButton.style.display = "block";
    gameOver = true;
    if (winner === "Draw") {
        return;
    }
    alert(`${winner} won!`);
}


function checkGame() {
    const combinations = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ];

    combinations.forEach(combo => {
        const a = combo[0] - 1, b = combo[1] - 1, c = combo[2] - 1;
        if (boxes[a].textContent !== "" &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[b].textContent === boxes[c].textContent
        ) {
            won(boxes[a].textContent);
        }
    });

    let isDraw = true;
    boxes.forEach(box => {
        if (box.textContent === "") 
            isDraw = false;
    });

    if (isDraw) {
        won("Draw");
    }
}


boxes.forEach(element => {
    element.addEventListener("click", () => {

        if (gameOver || element.textContent != "") {
            return;
        }

        element.style.backgroundColor = "#bfbfbf";

        if (clickCount % 2 == 0) {
            // Player 1
            element.textContent = "X";
        } else {
            // Player 2
            element.textContent = "O";
        }

        if (label.textContent[0] === "X") {
            label.textContent = "O's turn";
        } else {
            label.textContent = "X's turn";
        }

        clickCount++;
        checkGame();
    });
});