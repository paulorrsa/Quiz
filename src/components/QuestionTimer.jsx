import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimerout }) {

    const [remainingTimer, setRemainingTimer] = useState(timeout);

    useEffect(() => {
        console.log("timerout")
        const setTime = setTimeout(onTimerout, timeout);
        return () => {
            clearTimeout(setTime)
        }
    }, [timeout, onTimerout])

    useEffect(() => {
        console.log("Intervall")
        const interval = setInterval(() => {
            setRemainingTimer(prevRemainingTimer => prevRemainingTimer - 100)
        }, 100);
        return () => { clearInterval(interval) }
    }, [])


    return <progress id="question-time" max={timeout} value={remainingTimer} />
}