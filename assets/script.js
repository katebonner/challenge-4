var oneSecond = 1000;
var totalSeconds = 60;
var counter = 0;
var totalScore = 0;

var userInputPrompt = document.getElementById("username-request-element")
var questionSlide = document.getElementById("questionSlide");
var scoreBoardSlide = document.getElementById("score-board-slide");

// QUESTION OBJECTS
var question1 = {
    prompt: "in which html tag do we put the javascript ?",
    a: "<javascript>",
    b: "<java>",
    c: "<scripts>",
    d: "none of the above",
    answer: "none of the above"
}

var question2 = {
    prompt: "in which section do we place the javascript ?",
    a: "<head>",
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

// LIST OF USER OBJECTS
var users = [];

// SUBMIT USERNAME
var submitUsername = function(event) {
    event.preventDefault();
    var usernameInput = document.querySelector("input[name='user-name']").value;

    //CHECK IF INPUTS ARE EMPTY (VALIDATE)
    if (!usernameInput) {
        alert("please enter a username")
        return false;
    }

    //CREATE NEW USER OBJECT
    var userDataObj = {
        name: usernameInput,
        score: 0,
    }

    createUserEl(userDataObj);
    countdown();
    document.getElementById("form").style.display = "none";
    presentQuestions(counter);
}


//COUNTDOWN
function countdown() {
    var timerEl = document.getElementById("countdown");
    var timeInterval = setInterval( function() {
    timerEl.textContent = totalSeconds;

        if (totalSeconds > 0)
            totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(timeInterval);
            document.getElementById("questionSlide").style.display = "none";
            document.getElementById("countdown").style.display = "none";
            endQuiz()
        }
    }, oneSecond)
}



// PRESENT QUESTIONS
function presentQuestions(counter) {
    if (counter < questions.length) {

    questionSlide.className = "question-slide-index";

    // QUESTION ELEMENT
    var questionEl = document.createElement("div");
    questionEl.className = "question-element";

    // QUESTION PROMPT
    var questionPrompt = document.createElement("h2");
    questionPrompt.textContent = questions[counter].prompt;
    questionPrompt.className = "question-prompt"
    questionEl.appendChild(questionPrompt);

    // SELECTION A BUTTON
    var selectionA = document.createElement("button");
    selectionA.textContent = questions[counter].a;
    selectionA.className = "button";
    questionEl.appendChild(selectionA);

    // SELECTION B BUTTON
    var selectionB = document.createElement("button");
    selectionB.textContent = questions[counter].b;
    selectionB.className = "button";
    questionEl.appendChild(selectionB);

    // SELECTION C BUTTON
    var selectionC = document.createElement("button");
    selectionC.textContent = questions[counter].c;
    selectionC.className = "button";
    questionEl.appendChild(selectionC);

    // SELECTION D BUTTON
    var selectionD = document.createElement("button");
    selectionD.textContent = questions[counter].d;  
    selectionD.className = "button";  
    questionEl.appendChild(selectionD); 

    // ANSWER
    var answer = questions[counter].answer;
    localStorage.setItem("answer", answer);

    // APPEND TO HTML LINKED SECTION
    questionSlide.appendChild(questionEl);

    // LISTEN FOR CLICK
    questionEl.addEventListener("click", responseHandler);

    }
    else {
        document.getElementById("questionSlide").style.display = "none";
        document.getElementById("countdown").style.display = "none";
        endQuiz();
    }
}

// RESPONSE HANDELER
var responseHandler = function(event) {
    event.preventDefault();

    // PULL RESPONSE SELECTION AND CORRECT ANSWER 
    var response = event.target.textContent;
    var correctAnswer = localStorage.getItem("answer");

    // REMOVE LAST QUESTION FROM DISPLAY
    var lastQuestion = $(".question-element")[counter];
    $(".question-slide-index").find(lastQuestion).css("display", "none");

    // CHECK ACCURACY OF RESPONSE
    if ((response === correctAnswer) && (event.target.className == "button")) {
        // UPDATE SCORE
        totalScore++;
        console.log(totalScore);
        counter++;
        presentQuestions(counter)
    }
    else if (((response != correctAnswer) && (event.target.className == "button"))){
        // UPDATE TIME
        totalSeconds = totalSeconds - 10;
        counter++;
        presentQuestions(counter)
        
    }
}

// CREATE USER ELEMENT
var createUserEl = function(userDataObj) {
  
    var userEl = document.createElement("div")
    userEl.className = "user-element";
    userEl.setAttribute("data-name", userDataObj.name);
    userEl.setAttribute("data-score", userDataObj.score);
    document.body.appendChild(userEl);
}


// END QUIZ
var endQuiz = function() {
    // CREATE HEADING
    var scoreBoardHeading = document.createElement("h3");
    scoreBoardHeading.className = "score-board-heading";
    scoreBoardHeading.textContent = "score board";
    scoreBoardSlide.appendChild(scoreBoardHeading);

    // CREATE NAME + SCORE CONTAINER
    var nameScoreContainer = document.createElement("div");
    nameScoreContainer.classNAme = "name-score-container";

    // CREATE NAME LIST
    var scoreBoardNames = document.createElement("ul");
    scoreBoardNames.className = "score-board-names";
    // CREAT SCORE LIST
    var scoreBoardScores = document.createElement("ul");
    scoreBoardScores.className = "score-board-scores";
    
    var newUserObj = {
        name: $(".user-element").attr("data-name"),
        score: totalScore
    }

    // IF FIRST USER DATA OBJECT
    if (!("users" in localStorage)) {

        // STORE THE FIRST USER DATA OBJECT LOCALLY
        users.push(newUserObj);
        localStorage.setItem("users", JSON.stringify(users));

        //GET USER DATA OBJECTS FROM LOCAL STORAGE
        var usersStringArray = localStorage.getItem("users");
        var usersFromLocalStorage = JSON.parse(usersStringArray);

        // CREATE NAME LIST ELEMENT
        var userFromStorage = document.createElement("li");
        userFromStorage.textContent = usersFromLocalStorage[0].name;
        userFromStorage.className = "score-board-name-element";
        // CREATE SCORE LIST ELEMENT
        var scoreFromStorage = document.createElement("li");
        scoreFromStorage.textContent = usersFromLocalStorage[0].score; 
        scoreFromStorage.className = "score-board-score-element"; 
        // LINK ELEMENTS
        scoreBoardNames.appendChild(userFromStorage); 
        scoreBoardScores.appendChild(scoreFromStorage);
        nameScoreContainer.appendChild(scoreBoardNames);
        nameScoreContainer.appendChild(scoreBoardScores);
        scoreBoardSlide.appendChild(nameScoreContainer);
        return 0;   
    }
    
    // IF NOT FIRST USER DATA OBJECT
    if (localStorage.getItem("users") != 'null') {
    
        // //GET PREVIOUS USER DATA OBJECTS FROM LOCAL STORAGE
        var usersStringArray = localStorage.getItem("users");
        var usersFromLocalStorage = JSON.parse(usersStringArray);
        
        // STORE NEW DATA OBJECT 
        usersFromLocalStorage.push(newUserObj);
        localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));

        for (i = 0 ; i < usersFromLocalStorage.length ; i++){
            // CREATE NAME LIST ELEMENT
            var userFromStorage = document.createElement("li");
            userFromStorage.textContent = usersFromLocalStorage[i].name;
            userFromStorage.className = "score-board-name-element";
            // CREATE SCORE LIST ELEMENT
            var scoreFromStorage = document.createElement("li");
            scoreFromStorage.textContent = usersFromLocalStorage[i].score; 
            scoreFromStorage.className = "score-board-score-element"; 
            // LINK ELEMENTS
            scoreBoardNames.appendChild(userFromStorage); 
            scoreBoardScores.appendChild(scoreFromStorage);
            nameScoreContainer.appendChild(scoreBoardNames);
            nameScoreContainer.appendChild(scoreBoardScores);
            scoreBoardSlide.appendChild(nameScoreContainer);
        }
    }
    
}


// CALL FUNCTIONS
document.addEventListener("submit", submitUsername);














