const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestion = null;
let correctCount = 0;
let totalCount = 0;

console.log('Quiz data loaded:', quizData.length, 'questions');

function loadQuestion() {
    console.log('Loading new question...');
    optionsElement.innerHTML = '';
    nextButton.disabled = true;

    const randomIndex = Math.floor(Math.random() * quizData.length);
    currentQuestion = quizData[randomIndex];
    console.log('Current question:', currentQuestion);

    questionElement.textContent = currentQuestion.題目;

    const options = [
        { text: currentQuestion.答案, isCorrect: true },
        { text: currentQuestion.選項1, isCorrect: false },
        { text: currentQuestion.選項2, isCorrect: false },
        { text: currentQuestion.選項3, isCorrect: false }
    ];

    console.log('Options before shuffle:', options);

    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    console.log('Options after shuffle:', options);

    const letters = ['A', 'B', 'C', 'D'];
    options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');

        const letterSpan = document.createElement('span');
        letterSpan.textContent = letters[index];
        const textSpan = document.createElement('span');
        textSpan.textContent = option.text;

        optionElement.appendChild(letterSpan);
        optionElement.appendChild(textSpan);

        optionElement.addEventListener('click', () => handleAnswer(option, options));
        optionsElement.appendChild(optionElement);
    });

    console.log('Options rendered:', optionsElement.children.length, 'elements');
}

function handleAnswer(selectedOption, allOptions) {
    console.log('Answer selected:', selectedOption);
    const optionElements = optionsElement.querySelectorAll('.option');
    optionElements.forEach(el => el.style.pointerEvents = 'none');

    totalCount++;
    if (selectedOption.isCorrect) {
        correctCount++;
    }
    scoreElement.textContent = `對題: ${correctCount}/${totalCount}`;

    optionElements.forEach(el => {
        if (el.querySelector('span:nth-child(2)').textContent === selectedOption.text) {
            el.classList.add(selectedOption.isCorrect ? 'correct' : 'incorrect');
        } else if (el.querySelector('span:nth-child(2)').textContent === currentQuestion.答案) {
            el.classList.add('correct');
        }
    });

    // If the answer is correct, go to the next question after 1 second
    if (selectedOption.isCorrect) {
        setTimeout(() => {
            loadQuestion();
        }, 1000); // 1000ms = 1 second
    } else {
        nextButton.disabled = false; // Enable the button only if the answer is incorrect
    }
}

nextButton.addEventListener('click', loadQuestion);

loadQuestion();