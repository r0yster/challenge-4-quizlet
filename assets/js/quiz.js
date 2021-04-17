var startButton = document.querySelector('#start-btn');
var answerButton = document.querySelector('#card-btn')
var questionCard = document.querySelector('#card');
const wrapper = document.getElementById('card'); 
const footer = document.querySelector('footer');
var slide = 0;
var isOver = false;

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
    const isButton = event.target.nodeName === 'BUTTON';
    switch(event.target.id) {
        
        case 'start-btn':
            checkState();
            break;

        case 'high-scores':
            Show();
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

function Show(){
    alert("lsjdf");
};
    
function displayQuestion(slide) {
        btn1 = '<button id="a" class="card-button" type="button">' + quiz[slide].a + '</button>'
        btn2 = '<button id="b" class="card-button" type="button">' + quiz[slide].b + '</button>'
        btn3 = '<button id="c" class="card-button" type="button">' + quiz[slide].c + '</button>'
        btn4 = '<button id="d" class="card-button" type="button">' + quiz[slide].d + '</button>'
        questionCard.innerHTML = '<div><h1>' + quiz[slide].q + '</h1></div><div id="buttons">' + btn1 + btn2 + btn3 + btn4 + "</div";
};

function checkAnswer(qNumber, qResponse) {
    qAnswer = quiz[qNumber].ans;
    if (qResponse === qAnswer) {
        footer.innerHTML = "<div><h3>Correct</h3></div>";
    } else {
        footer.innerHTML = "<div><h3>Wrong</h3></div>";
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
    questionCard.innerHTML = '<div><h1>GAME OVER</h1>';
}

wrapper.addEventListener('click', eventHandler);

