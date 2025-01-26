import { useState } from "react"
import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"
import question from "../questions.js"

function Question({ index, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })
    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: question[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);

        }, 1000);

    }


    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }

    return (
        <div id="questions">
            {/* Nova forma de usar a key: Rederização de um novo componente */}
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimerout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{question[index].text}</h2>
            <Answers
                answers={question[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}
export default Question