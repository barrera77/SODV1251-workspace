import { quizData } from "./quiz-data.js";
import { quizTemplate, feedbackTemplate } from "./templates/quiz-templates.js";

// Get necessary elements from the DOM
const quizWrapper = document.querySelector(".quiz-wrapper");
const btnStartQuiz = document.querySelector(".btn-start-quiz");
const progressBar = document.querySelector(".inner-bar");
const progressText = document.querySelector(".progress-bar-container span");
const resultsContainer = document.querySelector(".results-container");

// Get the data
const quizQuestions = quizData["quiz-questions"];
const quizAnswers = quizData["quiz-answers"];

let score = 0;
let currentQuestionIndex;
let numOfAnswers = 0;
let totalQuestions = quizQuestions.length;
let answeredQuestions = [];
let skippedQuestions = [];
let isReviewingSkipped = false;

btnStartQuiz.addEventListener("click", (event) => {
  event.preventDefault();
  currentQuestionIndex = 0;
  renderQuiz(currentQuestionIndex);
});

function renderQuiz(questionIndex) {
  const currentQuestionObject = quizQuestions[questionIndex];

  quizWrapper.innerHTML = quizTemplate({
    quizQuestionObj: currentQuestionObject,
  });

  const answersGroup = document.querySelector(".answers-group");
  answersGroup.innerHTML = "";

  currentQuestionObject.possible_answers.forEach((answer, index) => {
    answersGroup.innerHTML += `
      <button
        class="btn btn-answer"
        data-question-id="${currentQuestionObject.id}"
        data-answer="${index}"
      >
        <div class="container">
          <span class="circle">
            <span>${index + 1}</span>
          </span>
        </div> 
        ${answer}
      </button>`;
  });

  handleAnswerButtons();

  const nextButton = document.querySelector(".btn-next-question");
  nextButton.textContent = isReviewingSkipped ? "Skip" : "Next";
  nextButton.onclick = handleNextQuestion;
}

function handleAnswerButtons() {
  document.querySelectorAll(".btn-answer").forEach((button) => {
    button.addEventListener("click", (event) => {
      const questionId = parseInt(event.target.dataset.questionId);
      const userAnswer = parseInt(event.target.dataset.answer);
      validateAnswer(questionId, userAnswer);
    });
  });
}

function validateAnswer(questionId, userAnswer) {
  let correctAnswer = quizAnswers.find(
    (answer) => answer.question_id === questionId
  );

  let feedbackMessage =
    userAnswer === correctAnswer.answer_index
      ? "Correct!!!"
      : `Wrong Answer. The correct answer is: ${
          correctAnswer.answer_index + 1
        }`;

  if (userAnswer === correctAnswer.answer_index) {
    score += 1;
  }

  answeredQuestions.push(questionId);
  skippedQuestions = skippedQuestions.filter(
    (q) => quizQuestions[q].id !== questionId
  );

  updateProgressBar();
  numOfAnswers += 1;
  renderFeedback({ quizAnswerObj: correctAnswer, feedbackMessage });
}

function renderFeedback({ quizAnswerObj, feedbackMessage }) {
  document.querySelector(".quiz-content").innerHTML = feedbackTemplate({
    quizAnswerObj,
    feedbackMessage,
  });

  const nextButton = document.querySelector(".btn-next-question");
  nextButton.textContent = isReviewingSkipped ? "Next Skipped" : "Next";
  nextButton.onclick = handleNextQuestion;
}

function handleNextQuestion() {
  if (!isReviewingSkipped && currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    if (!answeredQuestions.includes(quizQuestions[currentQuestionIndex].id)) {
      skippedQuestions.push(currentQuestionIndex);
    }
    renderQuiz(currentQuestionIndex);
  } else {
    handleSkippedOrFinish();
  }
}

function handleSkippedOrFinish() {
  if (skippedQuestions.length > 0) {
    isReviewingSkipped = true;
    currentQuestionIndex = skippedQuestions.shift();
    if (!answeredQuestions.includes(quizQuestions[currentQuestionIndex].id)) {
      skippedQuestions.push(currentQuestionIndex);
    }
    renderQuiz(currentQuestionIndex);
  } else {
    showResults();
  }
}

function updateProgressBar() {
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  progressBar.style.width = progress + "%";
  progressText.innerText = answeredCount;

  document.querySelector(
    ".outer-bar p"
  ).innerHTML = `Answered ${answeredCount} of ${totalQuestions} questions`;
}

function showResults() {
  updateProgressBar();

  resultsContainer.innerHTML = `
    <p>"Congrats! You've completed the quiz."</p>
    <p>Your score: ${score} out of ${totalQuestions}</p>
  `;
  quizWrapper.innerHTML = "";
}
