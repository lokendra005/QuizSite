let startBtn = document.querySelector('.start-btn');
let introContainer = document.querySelector('.intro-container');
let quizContainer = document.querySelector('.quiz-container');
let summaryContainer = document.querySelector('.summary-container');
let retryBtn = document.querySelector('.retry-btn');
let homeBtn = document.querySelector('.home-btn');
let questionIdx = 0;
let score = 0;

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        option1: '<script>',
        option2: '<css>',
        option3: '<style>',
        option4: '<span>',
        correct: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        option1: 'text-color',
        option2: 'font-color',
        option3: 'text-style',
        option4: 'color',
        correct: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        option1: '// Comment',
        option2: '<!-- Comment -->',
        option3: '/* Comment */',
        option4: '<! Comment>',
        correct: 2,
    },
];

let questionNumber = document.querySelector('.question-number');
let scoreDisplay = document.querySelector('.score-display');
let finalScoreDisplay = document.querySelector('.final-score');

startBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', startQuiz);
homeBtn.addEventListener('click', () => {
    summaryContainer.style.display = 'none';
    introContainer.style.display = 'flex';
});

function startQuiz() {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'flex';
    summaryContainer.style.display = 'none';

    questionIdx = 0;
    score = 0;
    updateQuestionNumber();
    updateScore();

    const questionElements = document.getElementsByClassName('question-element');
    for (let i = 0; i < questionElements.length; i++) {
        questionElements[i].style.display = 'none';
        let options = questionElements[i].getElementsByClassName('answer');
        for (let j = 0; j < options.length; j++) {
            options[j].style.backgroundColor = '';
        }
    }

    if (questionElements.length > 0) {
        questionElements[0].style.display = 'block';
    }
}

function updateQuestionNumber() {
    questionNumber.textContent = `Question: ${questionIdx + 1}`;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

questions.forEach((q, idx) => {
    let questionElement = document.createElement('div');
    questionElement.className = 'question-element';
    questionElement.style.display = idx === 0 ? 'block' : 'none';

    let questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = q.question;
    questionElement.appendChild(questionText);

    let answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

    for (let i = 1; i <= 4; i++) {
        let answer = document.createElement('div');
        answer.className = 'answer';

        let answerLetter = document.createElement('span');
        answerLetter.className = 'answer-letter';
        answerLetter.textContent = String.fromCharCode(64 + i);

        let answerText = document.createElement('div');
        answerText.className = 'answer-text';
        answerText.textContent = q['option' + i];

        answer.appendChild(answerLetter);
        answer.appendChild(answerText);

        answer.addEventListener('click', function() {
            if (i === q.correct) {
                answer.style.setProperty('background-color', 'green', 'important');
                score += 10;
                updateScore();
            } else {
                answer.style.setProperty('background-color', 'red', 'important');
            }

            setTimeout(function() {
                questionElement.style.display = 'none';

                if (idx < questions.length - 1) {
                    questionIdx++;
                    updateQuestionNumber();
                    document.getElementsByClassName('question-element')[idx + 1].style.display = 'block';
                } else {
                    quizContainer.style.display = 'none';
                    summaryContainer.style.display = 'flex';
                    finalScoreDisplay.textContent = `Final Score: ${score}`;
                }
            }, 800);
        });

        answersContainer.appendChild(answer);
    }

    questionElement.appendChild(answersContainer);
    quizContainer.appendChild(questionElement);
});
