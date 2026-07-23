// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const progressBar = document.getElementById("progress");
const resultMessage = document.getElementById("result-message");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "Which chemical element has the highest melting point?",
    answers: [
      {text: "Carbon", correct: true },
      {text: "Tungsten", correct: false },
      {text: "Platinum", correct: false },
      {text: "Osmium", correct: false },
    ],
  },
  {
    question: "Which empire was ruled by Suleiman the Magnificent?",
    answers: [
      {text: "Byzantine", correct: false },
      {text: "Ottoman", correct: true },
      {text: "Mughal", correct: false },
      {text: "Persian", correct: false },
    ],
  },
  {
    question: "What is the deepest known point in the Earth's oceans?",
    answers: [
      {text: "Java Trench", correct: false },
      {text: "Puerto Rico Trench", correct: false },
      {text: "Mariana Trench", correct: true },
      {text: "Sunda Trench", correct: false },
    ],
  },
  {
    question: "What is the primary currency used in South Africa?",
    answers: [
      {text: "Shilling", correct: false },
      {text: "Dinar", correct: false },
      {text: "Kwacha", correct: false },
      {text: "Rand", correct: true },
    ],
  },
  {
    question: "Which gas makes up roughly 78% of the Earth's atmosphere?",
    answers: [
      {text: "Oxygen", correct: false },
      {text: "Nitrogen", correct: true },
      {text: "Carbon Dioxide", correct: false },
      {text: "Argon", correct: false },
    ],
  },
  {
    question: "Who was the first female Prime Minister of the United Kingdom?",
    answers: [
      {text: "Margaret Thatcher", correct: true },
      {text: "Theresa May", correct: false },
      {text: "Angela Merkel", correct: false },
      {text: "Indira Gandhi", correct: false },
    ],
  }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// even listener
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset states
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // to do: explain this in a second
  answerContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1111);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Great effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();

  // reset 
}
