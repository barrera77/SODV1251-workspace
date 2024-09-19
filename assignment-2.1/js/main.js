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

//Start the quiz
startQuiz();

/**
 * Function to render the quiz components
 * @param {*} questionIndex
 */
function renderQuiz(questionIndex) {
  const currentQuestionObject = quizQuestions[questionIndex];

  quizWrapper.innerHTML = quizTemplate({
    quizQuestionObj: currentQuestionObject,
  });

  const answersGroup = document.querySelector(".answers-group");
  answersGroup.innerHTML = "";

  //add answer buttons
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

  //handle answer buttons logic
  handleAnswerButtons();

  const nextButton = document.querySelector(".btn-next-question");

  //If all questions have been reviewed but there are some pending for answer
  nextButton.textContent = isReviewingSkipped ? "Skip" : "Next";
  nextButton.onclick = handleNextQuestion;
}

/**
 * get the buttons for answers, assign even listeners and handle logic.
 */
function handleAnswerButtons() {
  document.querySelectorAll(".btn-answer").forEach((button) => {
    button.addEventListener("click", (event) => {
      const questionId = parseInt(event.target.dataset.questionId);
      const userAnswer = parseInt(event.target.dataset.answer);
      validateAnswer(questionId, userAnswer);
    });
  });
}

/**
 * Validates the chosen answer
 * @param {*} questionId
 * @param {*} userAnswer
 */
function validateAnswer(questionId, userAnswer) {
  let correctAnswer = quizAnswers.find(
    (answer) => answer.question_id === questionId
  );

  //create feedback for the user depending if whether the answer is correct or not
  let feedbackMessage =
    userAnswer === correctAnswer.answer_index
      ? "Correct!!!"
      : `Wrong Answer. The correct answer is: ${
          correctAnswer.answer_index + 1
        }`;

  //if the answer is correct increase the score
  if (userAnswer === correctAnswer.answer_index) {
    score += 1;
  }

  //track if the question was answered or skipped
  answeredQuestions.push(questionId);
  skippedQuestions = skippedQuestions.filter(
    (question) => quizQuestions[question].id !== questionId
  );

  //update the progress bar and display progress to the user
  updateProgressBar();
  numOfAnswers += 1;
  renderFeedback({ quizAnswerObj: correctAnswer, feedbackMessage });
}

/**
 * render the feedback component and display the feedback
 * @param {*} param0
 */
function renderFeedback({ quizAnswerObj, feedbackMessage }) {
  document.querySelector(".quiz-content").innerHTML = feedbackTemplate({
    quizAnswerObj,
    feedbackMessage,
  });

  //add the next button to continue (first review of the questions)
  const nextButton = document.querySelector(".btn-next-question");

  //change the text content if reviewing skipped questions
  nextButton.textContent = isReviewingSkipped ? "Next Skipped" : "Next";
  nextButton.onclick = handleNextQuestion;
}

/**
 * FUnction to handle the "next question" button
 */
function handleNextQuestion() {
  if (!isReviewingSkipped && currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;

    //check if thequestion was skipped
    if (!answeredQuestions.includes(quizQuestions[currentQuestionIndex].id)) {
      skippedQuestions.push(currentQuestionIndex);
    }

    //render the next question on if still during the first review
    renderQuiz(currentQuestionIndex);
  } else {
    //render the next question if done qieth the first review and/or
    //if reviewing the skipped question
    handleSkippedOrFinish();
  }
}

/**
 * handle the reviewing of the skipped questions
 */
function handleSkippedOrFinish() {
  //check if there are any skipped questions
  if (skippedQuestions.length > 0) {
    isReviewingSkipped = true;

    //get the first/next of the skipped questions
    currentQuestionIndex = skippedQuestions.shift();
    if (!answeredQuestions.includes(quizQuestions[currentQuestionIndex].id)) {
      skippedQuestions.push(currentQuestionIndex);
    }
    //render the question
    renderQuiz(currentQuestionIndex);
  } else {
    //if there are no more questions display thefinal result
    showResults();
  }
}

/**
 * Update the progress bar
 */
function updateProgressBar() {
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  progressBar.style.width = progress + "%";
  progressText.innerText = answeredCount;

  document.querySelector(
    ".outer-bar p"
  ).innerHTML = `Answered ${answeredCount} of ${totalQuestions} questions`;
}

/**
 * display the final results
 */
function showResults() {
  updateProgressBar();

  quizWrapper.innerHTML = "";

  quizWrapper.innerHTML = `
   <div class="results-container">
      <h2>"Congrats! You have completed the quiz."</h2>
      <p>Your score: ${score} out of ${totalQuestions}</p>
      <div class="btn-start-quiz-container">
        <button class="btn btn-start-quiz">Retry Quiz</button>
      </div>
  </div>
  `;

  //retry quiz
  startQuiz();
}

/**
 * Function to start the quiz
 */

function startQuiz() {
  document
    .querySelector(".btn-start-quiz-container")
    .addEventListener("click", (event) => {
      event.preventDefault();
      currentQuestionIndex = 0;
      renderQuiz(currentQuestionIndex);
    });
}
