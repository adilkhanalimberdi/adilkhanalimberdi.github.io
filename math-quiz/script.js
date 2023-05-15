var score = 0, a,b;
var answer, operator, userAns;
var quiz = "";
var n = 0, level = 0, restarted = 0;
var levels = [10, 100, 1000, 5000, 10000];
var operators = ["-", "+", "&divide;", "&times;"];

function restart() {
    score = 0;
    document.getElementById("score").innerHTML = score;
    started();
}

function loser() {
    document.getElementById("content").style.display = "none";
    document.getElementById("lose-res").innerHTML = quiz + " = " + answer;
    document.getElementById("youre").innerHTML = document.getElementById("ans").value;
    document.getElementById("lose").style.display = "block";
}

function generateQuiz() {
    quiz = "";
    a = randomNum(levels[level]);
    b = randomNum(levels[level]);
    operator = randomOper();

    if (operator == "&divide;" && b == 0) {
        while (b == 0) {
            b = randomNum(levels[level]);
        }
    }

    quiz += String(a) + " " + operator + " " + String(b);
    
    switch(operator) {
        case "+":
            answer = a + b;
            break;
        case "-":
            answer = a - b;
            break;
        case "&divide;":
            answer = Math.floor(a / b);
            break;
        case "&times;":
            answer = a * b;
            break;
    }

    document.getElementById("quizz").innerHTML = quiz + "=";
    n++;
    if ((n % 5 == 0 && n != 0) && n < 25) {
        level++;
    }

    document.addEventListener('keyup', function(event){
        if (event.key == "Enter" && document.getElementById("lose").style.display == "none") {
            check();
        }
    });

}

function check() {

    let userans =  document.getElementById("ans").value;

    if (userans == answer && userans != "") {
        score++;
    } else {
        score--;
    }

    if (score < 0) {
        score = 0;
        loser();
    }

    document.getElementById("score").innerHTML = score;

    generateQuiz();
}

function useranswer() {
    userAns = document.getElementById("ans").value;

    check();

    document.getElementById("ans").value = "";
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function randomOper() {
    return operators[randomNum(4)];
}

function started() {
    document.getElementById("lose").style.display = "none";
    document.getElementById("startbg").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("scoreboard").style.display = "flex";
    level = 0;
    n = 0;
    generateQuiz();
}
