const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        answer: "Shakespeare"
    },
    {
       question:"What does the acronym 'API' stand for in the context of software development?",
       options:["Application Programming Interface", "Advanced Programming Interface", "Automated Processing Interface", "Application Process Integration"],
       answer:"Application Programming Interface"
    },
    {
        question:"What does the acronym 'SQL' stand for?",
        options:["Structure Query Language", "Statistical Query Language", "Simple Query Language", "Symbolic Query Language"],
        answer:"Structure Query Language"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "HO2"],
        answer: "H2O"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Opium"],
        answer: "Oxygen"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Mt. Apo"],
        answer: "Mount Everest"
    },
    {
        question:"Who painted Mona Lisa?",
        options:["Michael Angelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        answer: "Leonardo da Vinci"
    },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionButton);
    });

    document.getElementById('score').innerText = score;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        alert("Correct!");
    } else {
        alert(`Incorrect! The correct answer was: ${correctAnswer}`);
    }
    document.getElementById('score').innerText = score;
    document.getElementById('next-button').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('next-button').style.display = 'none';
    } else {
        alert(`Quiz over! Your final score is: ${score}`);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
        document.getElementById('next-button').style.display = 'none';
    }
}

loadQuestion();
