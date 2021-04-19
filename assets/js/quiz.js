const questionCard = document.querySelector('#card');
const header = document.getElementById('')
const timer =  document.getElementById('timer');
var slide = 0;
var timeLeft = 75;
var anstext = '';
var stopTimer = false;
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
        q:'Grasslands, deserts, and prairies are examples of animal ________', 
        a:'Adaptations',
        b:'Seasons',
        c:'Habitats',
        d:'Organisms',
        ans: "c"
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
    console.log("slide is " + slide);
    const isButton = event.target.nodeName === 'BUTTON';
    switch(event.target.id) {
        
        case 'start-btn':
            stopTimer = false;
            countdown();
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
        case 'save-name':
            showStats();
            break;

        default:
            break;
    }
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
        '<input type="text" name="player-name" placeholder="LT" />' +
        '<button id="save-name">save</button>' +
    '</div>';
}

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
//
// END QUIZ FLOW FUNCTIONS
//

// TIMER FUNCTIONS
function countdown() {
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

// STORAGE FUNCTIONS


function showStats() {
    slide=6;
    stopTimer = true;

    questionCard.innerHTML = 
    '<div id="card" class="stat-card">' +
        '<h1>High Score</h1>' +
        '<table class="scores">' +
            '<tr>' +
                '<th>Player Initials</th>' +
                '<th>Score</th>' +
            '</tr>' +
            '<tr>' +
                '<td>name</td>' +
                '<td>score</td>' +
            '</tr>' +
            '<tr>' +
            '<td>name</td>' +
            '<td>score</td>' +
        '</tr>' +
        '</table>' +
        '<button id="goto-start" class="button" type="button">Start Page</button>' +
    '</div>'
}


displayStart();
wrapper.addEventListener('click', eventHandler);