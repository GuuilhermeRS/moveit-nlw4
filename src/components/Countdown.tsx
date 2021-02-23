import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false) // countdown ativo ou não

  const minutes = Math.floor(time / 60) // arredonda o número para baixo
  const seconds = time % 60 // pega o resto da divisão, os segundos

  // padStart irá adicionar o número 0 ao início se o minuto tiver apenas uma casa, ex: 05
  // split irá dividir cada algarismo em um elemento de um array, ex: ['0', '5']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setActive(true)
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>

  )
}