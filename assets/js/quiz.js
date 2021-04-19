// JQuery Shorthand
const questionCard = document.querySelector('#card');
const header = document.getElementById('')
const timer =  document.getElementById('timer');

// Global Variables
var slide = 0;              // track where user is in quiz
var timeLeft = 75;          // default timer value
var anstext = '';           // variable to display if answer is right or wrong
var stopTimer = false;      // value to stop timer in certain screens
var scoresLoaded = false;   // value to load scores once
var playerScores = [];      // local storage array
// quiz questions array
var quiz = [
    {
        q:'Commonly used data types DO NOT include :', 
        a:'strings',
        b:'booleans',
        c:'alerts',
        d:'numbers',
        ans: 'c'
    },{
        q:'Grasslands, deserts, and prairies are examples of animal __________.', 
        a:'adaptations',
        b:'seasons',
        c:'habitats',
        d:'organisms',
        ans: 'c'
    },{
        q:'Arrays in JavaScript can be used to store __________.', 
        a:'numbers and strings',
        b:'other arrays',
        c:'booleans',
        d:'all of the above',
        ans: 'd'
    },{   
        q:'A very useful tool used during development and debugging for printing content to the debugger is:', 
        a:'JavaScript',
        b:'terminal/bash',
        c:'for loops',
        d:'console.log',
        ans: 'd' 
    },{    
        q:'String values must be enclosed within __________ when being assigned to variables.', 
        a:'commas',
        b:'curly brackets',
        c:'quotes',
        d:'parenthesis',
        ans: 'd'
    }]
//
// QUIZ FLOW FUNCTIONS 
//
// event handler checking if user click is a button with switch cases on the id of the button
var eventHandler = function(event) {
    console.log("scores loaded " + scoresLoaded);
    const isButton = event.target.nodeName === 'BUTTON';
    switch(event.target.id) {
        
        case 'start-btn':
            stopTimer = false;
            startTimer();
            checkState();

        case 'goto-start':
            checkState();
            break;

        case 'a':
        case 'b':
        case 'c':
        case 'd':
            checkAnswer(slide,event.target.id);
            checkState();
            break;

        case 'high-scores':
            showStats();
            break;

        case 'save-name':
            debugger;
            saveScore();
            showStats();
            break;

        case 'clear-scores':
            clearScores();
            alert("scored cleared");
            break;

        default:
            break;
    }
}

// start timer function
function startTimer() {
    var timeInterval = setInterval(function() {   
        if (timeLeft > 0) {
            timer.textContent='Timer : ' + timeLeft + ' seconds';
            timeLeft--; 
        } else {
            timeLeft = 0;
            timer.textContent='';
            clearInterval(timeInterval);
            endQuiz();
        }
        if (stopTimer === true) {
            clearInterval(timeInterval);
            timer.textContent='';
        }
    }, 1000);
}

// function to check what screen is being shown depenedent on user advancement in quiz
function checkState(){
    switch (slide) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            displayQuestion(slide);
            break;
        case 5:
            endQuiz();
            break; 
        case 6:
            displayStart();
            break;            
    }
}

// function that when given a number, displays the question inside quiz[number]
function displayQuestion(slide) {
        btn1 = '<button id="a" class="button" type="button">' + quiz[slide].a + '</button>'
        btn2 = '<button id="b" class="button" type="button">' + quiz[slide].b + '</button>'
        btn3 = '<button id="c" class="button" type="button">' + quiz[slide].c + '</button>'
        btn4 = '<button id="d" class="button" type="button">' + quiz[slide].d + '</button>'
        questionCard.innerHTML = '<div><h1>' + quiz[slide].q + '</h1></div><div id="buttons">' + btn1 + btn2 + btn3 + btn4 + '</div><footer id="footer">' + anstext + '</footer>';
}

// function that checks users response to question answer
function checkAnswer(qNumber, qResponse) {
    qAnswer = quiz[qNumber].ans;
    if (qResponse === qAnswer) {
        anstext = 'Correct!';
    } else {
        anstext = 'Wrong!'
        timeLeft -= 10;
    }
    slide++;
}

// function to handle end game logic
function endQuiz() {
    stopTimer = true;
    questionCard.innerHTML = 
    '<div id="card" class="end-card">' + 
        '<h1>GAME OVER!</h1>' +
        '<p>Your score was ' + timeLeft +
        '<p>Please Enter Your Initials</p>' + 
        '<input id="player-initials" type="text" placeholder="LT" />' +
        '<button id="save-name">save</button>' +
    '</div>';
}

// fucntion to display screen start, resets all global variables
function displayStart() {
    slide=0;
    timeLeft = 75;
    anstext = '';
    questionCard.innerHTML = 
        '<h1>Code Quiz Challenge</h1>' +
        '<p>' +
            'Try to answer the following code-related quesetions within the time limit.' +
            'Keep in mind that incorrect answers will penalize your score/time by ten seconds!' +
        '</p>' +
        '<button id="start-btn" class="button" type="button">Start</button>' 
}

// function to show high scores screen
function showStats() {
    slide=6;
    stopTimer = true;
    var tableDataEl = "";
    if (!scoresLoaded) {
        loadScores();
    }
    for (var i = 0; i<playerScores.length; i++) {
        tableDataEl = tableDataEl + '<tr><td>' + playerScores[i].initials + '</td><td>' + playerScores[i].score + '</td>';
    };
    questionCard.innerHTML = 
    '<div id="card" class="stat-card">' +
        '<h1>High Score</h1>' +
        '<table class="scores">' +
            '<tr>' +
                '<th>Player Initials</th>' +
                '<th>Score</th>' +
                tableDataEl +
        '</table>' +
        '<button id="goto-start" class="button" type="button">Start Page</button>' +
        '<button id="clear-scores" class="button" type="button">Clear Scores</button>' +
    '</div>'

}
//
// END QUIZ FLOW FUNCTIONS
//

// STORAGE FUNCTIONS
function saveScore() {
    var scoreEl = {
        score: 0,
        initials: "",
    }
    scoreEl.score = timeLeft;
    scoreEl.initials = document.getElementById("player-initials").value.toUpperCase();

    playerScores.push(scoreEl);
    localStorage.setItem("localScores", JSON.stringify(playerScores));
}

function loadScores() {
    var savedScores = JSON.parse(localStorage.getItem("localScores"));
    if (!savedScores) {
        return false;
    }
    for (var i=0; i<savedScores.length; i++){
        playerScores.push(savedScores[i]);
    }
    scoresLoaded = true;
}

function clearScores() {
    localStorage.clear();
    playerScores = [];
}

displayStart();
wrapper.addEventListener('click', eventHandler);