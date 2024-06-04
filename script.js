const startQuizButton = document.getElementById('start-quiz');
const initialScreen = document.getElementById('initial-screen');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitAnswerButton = document.getElementById('submit-answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('time-left');

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyperlinking Text Mark Language"
        ],
        correctAnswer: 0
    },
    
    {
        question: "Which CSS property controls the text size?",
        options: [
            "font-size",
            "text-size",
            "font-style",
            "text-style"
        ],
        correctAnswer: 0
    },
    {
        question: "Which is the correct CSS syntax?",
        options: [
            "body {color: black;}",
            "{body:color=black;}",
            "body:color=black;",
            "body {color=black;}"
        ],
        correctAnswer: 0
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "msgBox('Hello World');",
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');"
        ],
        correctAnswer: 3
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            "style",
            "class",
            "id",
            "styles"
        ],
        correctAnswer: 0
    },
    {
        question: "How do you add a background color in CSS?",
        options: [
            "background-color: blue;",
            "color: blue;",
            "bgcolor: blue;",
            "background: blue;"
        ],
        correctAnswer: 0
    },
    {
        question: "Which property is used to change the font of an element?",
        options: [
            "font-family",
            "font-style",
            "font-weight",
            "font-size"
        ],
        correctAnswer: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function myFunction()",
            "function:myFunction()",
            "function = myFunction()",
            "function => myFunction()"
        ],
        correctAnswer: 0
    },
    
];

function startQuiz() {
    initialScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsElement.appendChild(optionElement);
    });
}

function handleAnswerSubmission() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }
    const answer = parseInt(selectedOption.value);
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        score++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.className = 'correct';
    } else {
        feedbackElement.textContent = 'Incorrect!';
        feedbackElement.className = 'incorrect';
    }
    scoreElement.textContent = `Score: ${score}`;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        resetTimer();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 30;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswerSubmission();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.innerHTML = `
        <h2>Quiz Over!</h2>
        <p>Your final score is: ${score}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

startQuizButton.addEventListener('click', startQuiz);
submitAnswerButton.addEventListener('click', handleAnswerSubmission);
