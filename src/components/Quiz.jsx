import { useState } from "react";
import questions from "../questions";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length;
    const suffledAnswers = [...questions[activeQuestionIndex].answers];
    suffledAnswers.sort(() => Math.random() - 0.5);

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }

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