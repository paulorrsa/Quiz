import { useCallback, useState } from "react";
import questions from "../questions";
import imgQuizCompleted from '../assets/quiz-complete.png';
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }, [])

    const handleSkipAnswers = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
    if (quizIsComplete) {
        return (
           <Summary userAnswers={userAnswers} />
        )
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswers}
            />
        </div>
    )
}