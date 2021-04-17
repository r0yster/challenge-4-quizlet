var startButton = document.querySelector('#start-btn');
var answerButton = document.querySelector('#card-btn')
var questionCard = document.querySelector('#card');
//var wrapper = document.querySelector('#wrapper');
var slide = 0;
var anstext = '';

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
    }];


var eventHandler = function(event) {
    console.log("...Listening...");
    console.log("Slide is - " + slide);
    const isButton = event.target.nodeName === 'BUTTON';
    switch(event.target.id) {
        
        case 'start-btn':
            checkState();
            break;

        case 'high-scores':
            console.log("clicked high-scores");
            break;

        case 'a':
        case 'b':
        case 'c':
        case 'd':
            checkAnswer(slide, event.target.id);
            checkState();
            break;

        default:
            break;
    }
} 

function checkState(){
    console.log("...In checkState...");
    if (slide < quiz.length) {
        displayQuestion(slide);
    } else if (slide === quiz.length) {
        endGame();
    }
}

function displayQuestion(slide) {
        console.log("...displayQuestion...");
        btn1 = '<button id="a" class="button" type="button">' + quiz[slide].a + '</button>'
        btn2 = '<button id="b" class="button" type="button">' + quiz[slide].b + '</button>'
        btn3 = '<button id="c" class="button" type="button">' + quiz[slide].c + '</button>'
        btn4 = '<button id="d" class="button" type="button">' + quiz[slide].d + '</button>'
        questionCard.innerHTML = '<div><h1>' + quiz[slide].q + '</h1></div><div id="buttons">' + btn1 + btn2 + btn3 + btn4 + '</div><footer id="footer">' + anstext + '</footer>';
};

function checkAnswer(qNumber, qResponse) {
    console.log("...In checkAnswer...");
    qAnswer = quiz[qNumber].ans;
    if (qResponse === qAnswer) {
        anstext = 'Correct!';
    } else {
        anstext = 'Wrong!'
        // decrease time here
    }
    slide++
};

function checkState(){
    if (slide < quiz.length) {
        displayQuestion(slide);
    } else if (slide === quiz.length) {
        endGame();
    }
}

function endGame() {
    questionCard.innerHTML = '<h1>GAME OVER</h1>';
}

wrapper.addEventListener('click', eventHandler);