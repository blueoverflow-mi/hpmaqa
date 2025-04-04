const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

let currentQuestion = null;

// quizData is now globally available from quizData.js
console.log('Quiz data loaded:', quizData.length, 'questions');

function loadQuestion() {
    optionsElement.innerHTML = '';
    nextButton.disabled = true;

    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentQuestion = quizData[randomIndex];

    questionElement.textContent = currentQuestion.題目;

    const options = [
        { text: currentQuestion.答案, isCorrect: true },
        { text: currentQuestion.選項1, isCorrect: false },
        { text: currentQuestion.選項2, isCorrect: false },
        { text: currentQuestion.選項3, isCorrect: false }
    ];

    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', () => handleAnswer(option, options));
        optionsElement.appendChild(optionElement);
    });
}

function handleAnswer(selectedOption, allOptions) {
    const optionElements = optionsElement.querySelectorAll('.option');
    optionElements.forEach(el => el.style.pointerEvents = 'none');

    optionElements.forEach(el => {
        if (el.textContent === selectedOption.text) {
            el.classList.add(selectedOption.isCorrect ? 'correct' : 'incorrect');
        } else if (el.textContent === currentQuestion.答案) {
            el.classList.add('correct');
        }
    });

    nextButton.disabled = false;
}

nextButton.addEventListener('click', loadQuestion);

// Start the game immediately since data is already loaded
loadQuestion();