import { quizData } from "./quiz-data.js";
import { quizTemplate, feedbackTemplate } from "./templates/quiz-templates.js";

//get necessary elements from the DOM
const quizWrapper = document.querySelector(".quiz-wrapper");
const btnStartQuiz = document.querySelector(".btn-start-quiz");
const progressBar = document.querySelector(".inner-bar");
const progressText = document.querySelector(".progress-bar-container span");

//Get the data
const quizQuestions = quizData["quiz-questions"];
const quizAnswers = quizData["quiz-answers"];

let score = 0;
let currentQuestion = 0;
let numOfAnswers = 0;
let totalQuestions = quizQuestions.length;
let answeredQuestions = [];
let skippedQuestions = [];

//Add event listener to the start quiz to commence the sequence
btnStartQuiz.addEventListener("click", (event) => {
  event.preventDefault();

  //set the first question
  currentQuestion = 0;
  renderQuiz(currentQuestion);
});

/**
 * Render the quiz component
 * @param {*} questionIndex
 */
function renderQuiz(questionIndex) {
  const currentQuestionObject = quizQuestions[questionIndex];

  //Empty quiz container
  quizWrapper.innerHTML = "";

  //render quiz template
  quizWrapper.innerHTML += quizTemplate({
    quizQuestionObj: currentQuestionObject,
  });

  //Handle answers
  handleAnswerButtons();
  handleNextQuestionButton();
}

/**
 * Handle the answer buttons click event to validate
 * the chosen annswer
 */
const handleAnswerButtons = () => {
  document.querySelectorAll(".btn-answer").forEach((button) => {
    button.addEventListener("click", (event) => {
      const questionId = event.target.dataset.questionId;
      const userAnswer = event.target.dataset.answer;

      validateAnswer(questionId, userAnswer);
    });
  });
};

/**
 * Function to validate the answer and provide feedback
 * @param {*} userAnswer
 * @param {*} questionId
 * @returns
 */
function validateAnswer(questionId, userAnswer) {
  let correctAnswer = quizAnswers.find(
    (answer) => answer.question_id == questionId
  );

  let feedbackMessage = "";

  if (userAnswer === correctAnswer.answer) {
    feedbackMessage = "Correct!!!";
    score += 1;
    numOfAnswers += 1;
    answeredQuestions.push(questionId);
    //update the progress bar
    updateProgressBar();
    console.log(answeredQuestions);
  } else {
    feedbackMessage = `Wrong Answer. The correct answer is: ${correctAnswer.answer}`;
  }
  renderFeedback({ quizAnswerObj: correctAnswer, feedbackMessage });
}

/**
 * Render the feedback component
 * @param {*} param0
 */
function renderFeedback({ quizAnswerObj, feedbackMessage }) {
  document.querySelector(".quiz-content").innerHTML = "";

  document.querySelector(".quiz-content").innerHTML += feedbackTemplate({
    quizAnswerObj,
    feedbackMessage,
  });

  handleNextQuestionButton();
}

// Handle next button to move either skip or move the next question
const handleNextQuestionButton = () => {
  document.querySelector(".btn-next-question").addEventListener("click", () => {
    currentQuestion += 1;

    if (currentQuestion < quizQuestions.length) {
      if (!answeredQuestions.includes(currentQuestion.toString())) {
        skippedQuestions.push(currentQuestion);
      }
      renderQuiz(currentQuestion);
      console.log(skippedQuestions);
    } else {
      quizWrapper.innerHTML = `<p>Quiz finished! Your score is: ${score}</p>`;
    }
  });
};

//progress bar
function updateProgressBar() {
  const answeredCount = answeredQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  progressBar.style.width = progress + "%";
  progressText.innerText = answeredCount;

  document.querySelector(
    ".outer-bar p"
  ).innerHTML = `Answered ${answeredCount} of ${totalQuestions} questions`;
}

function renderSkippedQuestions() {
  if (currentQuestion === totalQuestions && skippedQuestions.length > 0) {
    skippedQuestions.forEach((skippedQuestion) => {
      let questionIndex = skippedQuestion.enderQuiz(questionIndex);
    });
  }

  renderQuiz();
}
