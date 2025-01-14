import { useCallback, useState } from "react";
import questions from "../questions";
import imgQuizCompleted from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }
            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)

    }, [activeQuestionIndex])

    const handleSkipAnswers = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
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
                {/* Nova forma de usar a key: Rederização de um novo componente */}
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimerout={handleSkipAnswers} />
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {suffledAnswers.map((answer) => {
                        let cssClass = '';
                        if(answerState === 'answered')
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}