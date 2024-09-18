export const quizTemplate = ({ quizQuestionObj }) =>
  `<div class="quiz-section">      

        <h2>Trivia Night Quiz - Software Development Edition</h2>

    <div class="quiz-col quiz-content">
        <h2>Question ${quizQuestionObj.id}</h2>
        <p>${quizQuestionObj.question}</p>
        <div class="answers-group">
        
        </div>
        <div class="btn-next-container">
            <button class="btn btn-next-question">Next</button>
        </div>        
    </div>
    <div class="quiz-col quiz-image">
        <img src="${quizQuestionObj.img_url}" alt="software-development-quiz" />
    </div>
    </div>
`;

export const feedbackTemplate = ({ quizAnswerObj, feedbackMessage }) =>
  `
<div class="feedback-container">
    <div class="feedback">
        <p class="feedback-message">${feedbackMessage}</p>
        <p class="facts">${quizAnswerObj.facts}</p>
    </div>
        <div class="btn-next-container">
            <button class="btn btn-next-question">Next</button>
        </div>    
</div>
`;
