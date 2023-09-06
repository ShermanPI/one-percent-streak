import { useState, useRef } from 'react'
import './App.css'
import HabitCardTracker from './components/HabitCardTracker'
import {millisToMinutesAndSeconds} from './logic/millisToMinutesAndSeconds'


function App() {
  const [totalTime, setTotalTime] = useState('00:00')
  const formRef = useRef()

  const handleChange = () => {
    const formData = formRef.current
    
    const minutesInSeconds = formData.minutes.value ? (formData.minutes.value) * 60 : 0
    const seconds = formData.seconds.value ? formData.seconds.value : 0
    const streak = formData.streak.value ? formData.streak.value : 0
    const percentage = 1
    
    let totalInMillseconds = ((minutesInSeconds + seconds) * ((1 + percentage / 100) ** streak)) * 1000

    setTotalTime(millisToMinutesAndSeconds(totalInMillseconds))
  }


  return (
    <>
      <h1>My Dashboard ⭐</h1>
      <div className="streaks-container">
        <HabitCardTracker title='Time'>
          <form className='time-form' onChange={handleChange} ref={formRef}>
            <div className='form-input'>
              <label htmlFor="minutes">Minutes</label>
              <input type="text" name='minutes' />
            </div>

            <div className='form-input'>
              <label htmlFor="seconds">Seconds</label>
              <input type="text" name='seconds' />
            </div>

            <div className='form-input'>
              <label htmlFor="streak">Streak days 🔥</label>
              <input type="text" name='streak' />
            </div>
            <h4>Total: <span>{totalTime}</span></h4>
          </form>

        </HabitCardTracker>

        <HabitCardTracker title='Counter' />
      </div>
    </>
  )
}

export default App
