import { useState, useRef, useEffect } from 'react'
import './App.css'
import HabitCardTracker from './components/HabitCardTracker'
import { millisToMinutesAndSeconds } from './logic/millisToMinutesAndSeconds'

function App () {
  const [totalTime, setTotalTime] = useState('00:00')
  const [gradesTable, setGradesTable] = useState(() => {
    if (window.localStorage.getItem('table')) {
      return JSON.parse(window.localStorage.getItem('table'))
    } else {
      return []
    }
  })
  const [amount, setAmount] = useState(0)
  const formRef = useRef()
  const countFormRef = useRef()

  useEffect(() => {
    window.localStorage.setItem('table', JSON.stringify(gradesTable))
  }, [gradesTable])

  const handleChange = () => {
    const formData = formRef.current

    const minutesInSeconds = formData.minutes.value ? (formData.minutes.value) * 60 : 0
    const seconds = formData.seconds.value ? formData.seconds.value : 0
    const streak = formData.streak.value ? formData.streak.value : 0
    const percentage = 1

    const totalInMillseconds = ((minutesInSeconds + seconds) * ((1 + percentage / 100) ** streak)) * 1000

    setTotalTime(millisToMinutesAndSeconds(totalInMillseconds))
  }

  const handleAmountChange = () => {
    const formData = countFormRef.current

    const initialAmount = formData.amount.value ? formData.amount.value : 0
    const streak = formData.streak.value ? formData.streak.value : 0
    const percentage = 1

    const total = (initialAmount * ((1 + percentage / 100) ** streak)).toFixed(2)

    setAmount(total)
  }

  const handleRubricSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const name = form.name.value
    const grade = parseFloat(parseFloat(form.grade.value).toFixed(2))
    const maxGrade = parseFloat(parseFloat(form.maxGrade.value).toFixed(2))
    const tenScale = grade / maxGrade * 10
    const hundredScale = parseFloat(parseFloat(tenScale * 10).toFixed(2))
    let level = ''

    if (tenScale >= 9.5) level = 'excelente'
    else if (tenScale >= 8.5) level = 'bueno'
    else if (tenScale >= 7.5) level = 'regular'
    else if (tenScale >= 7) level = 'suficiente'
    else if (tenScale >= 6 || tenScale < 6) level = 'debe mejorar'

    console.log(grade, maxGrade, typeof grade, typeof maxGrade)
    if (grade > maxGrade) {
      window.alert('La calificacion no puede ser mayor que la cantidad total de puntos')
      return
    }

    const newTable = [{ name, grade, maxGrade, hundredScale, level }, ...gradesTable]
    console.log(newTable)
    setGradesTable(newTable)
    form.name.value = ''
    form.grade.value = ''
  }

  const deleteTable = () => {
    if (window.confirm('Are you sure you want to proceed?')) {
      setGradesTable([])
    }
  }

  return (
    <>
      <h1>My Dashboard ⭐</h1>
      <div className='streaks-container'>
        <HabitCardTracker title='Rubrica'>
          <form className='time-form' onSubmit={handleRubricSubmit}>
            <div className='form-input'>
              <label htmlFor='name'>Nombre del estudiante</label>
              <input type='text' id='name' name='name' required />
            </div>

            <div className='form-input'>
              <label htmlFor='grade'>Calificación</label>
              <input type='text' id='grade' name='grade' required />
            </div>

            <div className='form-input'>
              <label htmlFor='maxGrade'>Califiación Máxima</label>
              <input type='text' id='maxGrade' name='maxGrade' required />
            </div>
            <input type='submit' value='Submit' />
          </form>

        </HabitCardTracker>

        <h2>Tabla De Calificaciones</h2>
        <button onClick={deleteTable}>Limpiar tabla</button>
        <table>
          <thead>
            <tr><th>Numero</th><th>Nombre</th><th>Califiación</th><th>Escala de Cien</th><th>Nivel</th></tr>
          </thead>
          <tbody>
            {gradesTable.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{`${el.grade}/${el.maxGrade}`}</td>
                  <td>{`${el.hundredScale}/100`}</td>
                  <td>{el.level}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <HabitCardTracker title='Time'>
          <form className='time-form' onChange={handleChange} ref={formRef}>
            <div className='form-input'>
              <label htmlFor='minutes'>Initial Minutes</label>
              <input type='text' name='minutes' />
            </div>

            <div className='form-input'>
              <label htmlFor='seconds'>Seconds</label>
              <input type='text' name='seconds' />
            </div>

            <div className='form-input'>
              <label htmlFor='streak'>Streak days 🔥</label>
              <input type='text' name='streak' />
            </div>
            <h4>Total: <span>{totalTime}</span></h4>
          </form>

        </HabitCardTracker>

        <HabitCardTracker title='Counter'>
          <form className='time-form' onChange={handleAmountChange} ref={countFormRef}>
            <div className='form-input'>
              <label htmlFor='amount'>Initial Amount</label>
              <input type='text' name='amount' />
            </div>

            <div className='form-input'>
              <label htmlFor='streak'>Streak days 🔥</label>
              <input type='text' name='streak' />
            </div>
            <h4>Total: <span>{amount}</span></h4>
          </form>
        </HabitCardTracker>
      </div>
    </>
  )
}

export default App
