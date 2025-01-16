import { useCallback, useState } from "react";
import questions from "../questions";
import Answers from "./Answers";
import imgQuizCompleted from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";
import Question from "./Question";

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

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={questions[activeQuestionIndex].text}
                answers={questions[activeQuestionIndex].answers}
                answerState={answerState}
                selectAnswer={userAnswers[userAnswers.length - 1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswers}
            />
        </div>
    )
}