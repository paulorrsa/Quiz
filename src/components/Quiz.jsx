import { useState } from "react";
import questions from "../questions";
import imgQuizCompleted from '../assets/quiz-complete.png';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === questions.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={imgQuizCompleted} alt="end game" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const suffledAnswers = [...questions[activeQuestionIndex].answers];
    suffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="questions">
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {suffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}