import { useState, useEffect } from "react"

const Timer = () => {

    const [second, setSecond] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let intervalId

        if (isRunning) {
            intervalId = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(intervalId)

    }, [isRunning])

    const timeReset = () => {
        setSecond(0)
        setIsRunning(false)
    }

    const timePause = () => {
        setIsRunning(!isRunning)
    }

    const convertToString = (sec) => {
        const MINUTE_SECOND = 60
        const HOUR_MINUTE = 60
        const DAY_HOUR = 24

        // <value>d <value>h <value>m <value>s
        const minute = Math.floor(sec / MINUTE_SECOND) % HOUR_MINUTE
        const second = sec % MINUTE_SECOND
        const hour = Math.floor(sec / (MINUTE_SECOND * HOUR_MINUTE)) % DAY_HOUR
        const day = Math.floor(sec / (MINUTE_SECOND * HOUR_MINUTE * DAY_HOUR))


        if (day > 0) {
            return day + 'd ' + hour + 'h ' + minute + 'm ' + second + 's'
        }
        else if (hour > 0) {
            return hour + 'h ' + minute + 'm ' + second + 's'
        }
        else if (minute > 0) {
            return minute + 'm ' + second + 's'
        }
        else {
            return second + 's'
        }

    }

    return (
        <div className="border border-black border-2 rounded-3 mx-auto mt-3 p-2 bg-body-secondary" style={{ width: 'fit-content' }}>
            <h1 className="text-center fw-bold text-primary d-block">TIMER</h1>
            <input value={convertToString(second)} style={{ textAlign: 'right' }} className="mx-auto d-flex"></input>
            <div className="d-flex justify-content-center align-items-center gap-3 p-1">
                <button className="btn btn-danger px-3" onClick={timeReset}><i class="bi bi-arrow-counterclockwise"></i>Reset</button>
                <button className={`btn btn-${isRunning ? 'warning' : 'success'} px-3`} onClick={timePause}><i class={`bi bi-${isRunning ? 'pause' : 'play'}`}></i>{isRunning ? 'Pause' : 'Run'}</button>
            </div>
        </div>
    )
}

export default Timer