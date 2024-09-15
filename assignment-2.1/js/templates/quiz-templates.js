export const quizTemplate = ({ questionId, answer, facts, img_url }) =>
  `<div class="quiz-section">
        <h2>Trivia Night Quiz Software Development Edition</h2>

    <div class="quiz-col quiz-content">
        <h2>Question ${questionId}</h2>
        <p>Por que cruzo la gallina el camino</p>
        <div class="answers-group">
        <button
            class="btn btn-answer"
            data-question-id="${questionId}"
            data-answer="${answer}"
        >
            Answer 1
        </button>
        <button
            class="btn btn-answer"
            data-question-id="${questionId}"
            data-answer="${answer}"
        >
            Answer 2
        </button>
        <button
            class="btn btn-answer"
            data-question-id="${questionId}"
            data-answer="${answer}"
        >
            Answer 3
        </button>
        </div>
        <div class="btn-next-container">
        <button class="btn btn-next">Next</button>
        </div>
        <div class="feedback-container">
        <div class="feedback">
            <p class="feedback-message">${feedbackMessage}</p>
            <p class="facts">${facts}</p>
        </div>
        </div>
    </div>
    <div class="quiz-col quiz-image">
        <img src="${img_url}" alt="software-development-quiz" />

    </div>
    </div>
`;
