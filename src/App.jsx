import { useState, useRef } from 'react'
import './App.css'
import HabitCardTracker from './components/HabitCardTracker'
import {millisToMinutesAndSeconds} from './logic/millisToMinutesAndSeconds'


function App() {
  const [totalTime, setTotalTime] = useState('00:00')
  const [amount, setAmount] = useState(0)
  const formRef = useRef()
  const countFormRef = useRef()

  const handleChange = () => {
    const formData = formRef.current
    
    const minutesInSeconds = formData.minutes.value ? (formData.minutes.value) * 60 : 0
    const seconds = formData.seconds.value ? formData.seconds.value : 0
    const streak = formData.streak.value ? formData.streak.value : 0
    const percentage = 1
    
    let totalInMillseconds = ((minutesInSeconds + seconds) * ((1 + percentage / 100) ** streak)) * 1000

    setTotalTime(millisToMinutesAndSeconds(totalInMillseconds))
  }

  const handleAmountChange = () => {
    const formData = countFormRef.current

    const initialAmount = formData.amount.value ? formData.amount.value : 0
    const streak = formData.streak.value ? formData.streak.value : 0
    const percentage = 1
    
    console.log(initialAmount, streak)
    let total = (initialAmount * ((1 + percentage / 100) ** streak)).toFixed(2)

    setAmount(total)
  }


  return (
    <>
      <h1>My Dashboard ⭐</h1>
      <div className="streaks-container">
        <HabitCardTracker title='Time'>
          <form className='time-form' onChange={handleChange} ref={formRef}>
            <div className='form-input'>
              <label htmlFor="minutes">Initial Minutes</label>
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

        <HabitCardTracker title='Counter'>
        <form className='time-form' onChange={handleAmountChange} ref={countFormRef}>
            <div className='form-input'>
              <label htmlFor="amount">Initial Amount</label>
              <input type="text" name='amount' />
            </div>

            <div className='form-input'>
              <label htmlFor="streak">Streak days 🔥</label>
              <input type="text" name='streak' />
            </div>
            <h4>Total: <span>{amount}</span></h4>
          </form>
        </HabitCardTracker>

        <HabitCardTracker title='Counter'>
        <form className='time-form' onChange={handleAmountChange} ref={countFormRef}>
            <div className='form-input'>
              <label htmlFor="amount">Initial Amount</label>
              <input type="text" name='amount' />
            </div>

            <div className='form-input'>
              <label htmlFor="streak">Streak days 🔥</label>
              <input type="text" name='streak' />
            </div>
            <h4>Total: <span>{amount}</span></h4>
          </form>
        </HabitCardTracker>
        <HabitCardTracker title='Counter'>
        <form className='time-form' onChange={handleAmountChange} ref={countFormRef}>
            <div className='form-input'>
              <label htmlFor="amount">Initial Amount</label>
              <input type="text" name='amount' />
            </div>

            <div className='form-input'>
              <label htmlFor="streak">Streak days 🔥</label>
              <input type="text" name='streak' />
            </div>
            <h4>Total: <span>{amount}</span></h4>
          </form>
        </HabitCardTracker>
      </div>
    </>
  )
}

export default App
