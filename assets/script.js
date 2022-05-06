var score = 0;
var oneSecond = 1000;
var timerEl = document.getElementById("countdown");

var questionSlide = document.getElementById("questionSlide");

// QUESTION OBJECTS
var question1 = {
    prompt: "in which html tag do we put the javascript ?",
    a: "<javascript>",
    b: "<java>",
    c: "<script>",
    d: "<js>",
    answer: "<script>"
}

var question2 = {
    prompt: "in which section do we place the javascript ?",
    a: "<heade>",
    b: "<body>",
    c: "both",
    d: "neither",
    answer: "<body>"
}

var question3 = {
    prompt: "what is the proper way to reference external script, 'script.js' ?",
    a: "<script src='script.js'>",
    b: "<script href='script.js'>",
    c: "<script link='script.js'>",
    d: "<script rel='script.js'>",
    answer: "<script src='script.js'>"
}

var question4 = {
    prompt: "how do you call a function named 'functionX' ?",
    a: "var functionX ",
    b: "function functionX",
    c: "functionX",
    d: "functionX()",
    answer: "functionX()"
}

var question5 = {
    prompt: "which is the proper if statement ?",
    a: "if x = 2",
    b: "if x == 2",
    c: "if (x = 2)",
    d: "if (x == 2)",
    answer: "if (x == 2)"
}

// LIST OF QUESTION OBJECTS
var questions = [question1, question2, question3, question4, question5];

// PRESENT QUESTIONS
function questionOne() {
        // QUESTION ELEMENT
        var questionEl = document.createElement("div");
        questionEl.className = "question-element";

        // QUESTION PROMPT
        var questionPrompt = document.createElement("h2");
        questionPrompt.textContent = questions[0].prompt;
        questionPrompt.className = "question-prompt"
        questionEl.appendChild(questionPrompt);

        // SELECTION A BUTTON
        var selectionA = document.createElement("button");
        selectionA.textContent = questions[0].a;
        selectionA.className = "button";
        questionEl.appendChild(selectionA);

        // SELECTION B BUTTON
        var selectionB = document.createElement("button");
        selectionB.textContent = questions[0].b;
        selectionB.className = "button";
        questionEl.appendChild(selectionB);

        // SELECTION C BUTTON
        var selectionC = document.createElement("button");
        selectionC.textContent = questions[0].c;
        selectionC.className = "button";
        questionEl.appendChild(selectionC);

        // SELECTION D BUTTON
        var selectionD = document.createElement("button");
        selectionD.textContent = questions[0].d;  
        selectionD.className = "button";  
        questionEl.appendChild(selectionD); 

        // APPEND TO HTML LINKED SECTION
        questionSlide.appendChild(questionEl);

        // LISTEN FOR CLICK
        questionEl.addEventListener("click", responseHandlerOne);
}
// RESPONSE HANDELER
var responseHandlerOne = function(event) {
    var response = event.target.textContent;
    if (response === questions[0].answer){
        score++;
        return 0;
    }
    else {
        return 0;
    }
}


//COUNTDOWN
function countdown() {
    var totalSeconds = 60;
    var timeInterval = setInterval( function() {
        timerEl.textContent = totalSeconds;
        totalSeconds--;
        if (totalSeconds < 0) {
            clearInterval(timeInterval);
        }
    }, oneSecond)
}

countdown();
questionOne();



