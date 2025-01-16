import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"

function Question ({questionText, answers, onSelectAnswer, selectAnswer, answerState, onSkipAnswer}){
    return (
        <div id="questions">
                {/* Nova forma de usar a key: Rederização de um novo componente */}
                <QuestionTimer
                    timeout={10000}
                    onTimerout={onSkipAnswer}
                />
                <h2>{questionText}</h2>
                <Answers
                    answers={answers}
                    selectedAnswer={selectAnswer}
                    answerState={answerState}
                    onSelect={onSelectAnswer}
                />
            </div>
    )
}
export default Question