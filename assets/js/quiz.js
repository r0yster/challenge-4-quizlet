const questionCard = document.querySelector('#card');
const timer =  document.getElementById('timer');
var slide = 0;
var timeLeft = 75;
var anstext = '';
// quiz questions array
var quiz = [
    {
        q:'hey this is question 1 here who are tom petty and the heartbreakers', 
        a:'answer 1',
        b:'answer 2',
        c:'answer 3',
        d:'answer 4',
        ans: "c"
    },{
        q:'hey this is question 2', 
        a:'answer 1',
        b:'answer 2',
        c:'answer 3',
        d:'answer 4',
        ans: "a"
    },{
        q:'hey this is question 3', 
        a:'answer 1',
        b:'answer 2',
        c:'answer 3',
        d:'answer 4',
        ans: "d"
    },{   
        q:'hey this is question 4', 
        a:'answer 1',
        b:'answer 2',
        c:'answer 3',
        d:'answer 4',
        ans: "d" 
    },{    
        q:'hey this is question 5', 
        a:'answer 1',
        b:'answer 2',
        c:'answer 3',
        d:'answer 4',
        ans: "b"
    }]
//
// QUIZ FLOW FUNCTIONS 
//
// event handler checking if user click is a button with switch cases on the id of the button
var eventHandler = function(event) {
    console.log("...Listening...");
    console.log("Slide is - " + slide);
    const isButton = event.target.nodeName === 'BUTTON';
    switch(event.target.id) {
        
        case 'start-btn':
            countdown();
            checkState();
            break;

        case 'high-scores':
            showStats();
            break;

        case 'a':
        case 'b':
        case 'c':
        case 'd':
            checkAnswer(slide, event.target.id);
            checkState();
            break;

        case 'save-name':
            showStats();
        default:
            break;
    }
}

// function to check what screen is being shown depenedent on user advancement in quiz
function checkState(){
    console.log("...In checkState...");
    if (slide < quiz.length) {
        displayQuestion(slide);
    } else if (slide === quiz.length) {
        endGame();
    }
}

// function that when given a number, displays the question inside quiz[number]
function displayQuestion(slide) {
        console.log("...displayQuestion...");
        btn1 = '<button id="a" class="button" type="button">' + quiz[slide].a + '</button>'
        btn2 = '<button id="b" class="button" type="button">' + quiz[slide].b + '</button>'
        btn3 = '<button id="c" class="button" type="button">' + quiz[slide].c + '</button>'
        btn4 = '<button id="d" class="button" type="button">' + quiz[slide].d + '</button>'
        questionCard.innerHTML = '<div><h1>' + quiz[slide].q + '</h1></div><div id="buttons">' + btn1 + btn2 + btn3 + btn4 + '</div><footer id="footer">' + anstext + '</footer>';
}

// function that checks users response to question answer
function checkAnswer(qNumber, qResponse) {
    console.log("...In checkAnswer...");
    qAnswer = quiz[qNumber].ans;
    if (qResponse === qAnswer) {
        anstext = 'Correct!';
    } else {
        anstext = 'Wrong!'
        timeLeft -= 10;
    }
    slide++
}

// function to handle end game logic
function endGame() {
    questionCard.innerHTML = 
    '<div id="card" class="end-card">' + 
        '<h1>GAME OVER!</h1>' +
        '<p>Your score was ' + timeLeft +
        '<p>Please Enter Your Initials</p>' +
        '<input type="text" name="player-name" placeholder="LT" />' +
        '<button id="save-name">save</button>' +
    '</div>';
}
//
// END QUIZ FLOW FUNCTIONS
//

// TIMER FUNCTIONS
function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft >= 1 && slide != quiz.length) {
            timer.textContent = 'Timer : ' + timeLeft + " seconds";
            timeLeft--;
        } else if (timeLeft === 1) {
            timer.textContent = 'Timer : ' + timeLeft + " second";
        } else {
            timer.remove();
            clearInterval(timeInterval);
            endGame();
        }
      }, 1000);
}

// STORAGE FUNCTIONS


function showStats() {
    questionCard.innerHTML = 
    '<div id="card" class="stat-card">' +
        '<h1>High Score</h1>' +
        '<table class="scores">' +
            '<tr>' +
                '<th>Player Initials</th>' +
                '<th>Score</th>' +
            '</tr>' +
        '</table>' +
    '</div>'
}

wrapper.addEventListener('click', eventHandler);