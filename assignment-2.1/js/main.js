import { quizData } from "./quiz-data";
import { quizTemplate } from "./templates/quiz-templates";

const quizWrapper = document.querySelector(".quiz-wrapper");
const btnStartQuiz = document.querySelector(".btn-start-quiz");

const { quizQuestions, quizAnswers } = quizData;

const score = 0;

btnStartQuiz.addEventListener("click", (event) => {
  event.preventDefault();
  renderQuiz();
});

function renderQuiz() {
  //Empty quiz container
  quizWrapper.innerHTML += "";

  //render quiz template
  quizWrapper.innerHTML += quizTemplate;
}

const handleAnswerButtons = () => {
  document.querySelectorAll(".btn-answer").forEach((button) => {
    button.addEventListener("click", (event) => {
      const questionId = event.target.dataset.question_id;
      const userAnswer = event.target.dataset.answer;

      validateAnswer(questionId, userAnswer);
    });
  });
};

function validateAnswer(userAnswer, questionId) {
  let feedbackMessage = "";
  let correctAnswer = quizAnswers.find(
    (answer) => answer.question_id === questionId
  );

  if (userAnswer === null || userAnswer === "") {
    goToNextQuestion();
    return;
  }

  if (userAnswer === correctAnswer.answer) {
    feedbackMessage = `"Correct!!!", ${correctAnswer.facts}`;
    score += 1;
  } else {
    feedbackMessage =
      ("Wrong Answer. The correct answer is: ", `${correctAnswer.answer}`);
  }
  goToNextQuestion();
}

function goToNextQuestion() {}
