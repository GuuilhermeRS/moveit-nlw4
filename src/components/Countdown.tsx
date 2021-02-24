import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false) // estado para countdown ativo ou não
  const [HasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60) // arredonda o número para baixo, para exibir apenas os minutos
  const seconds = time % 60 // pega o resto da divisão, apenas os segundos

  // padStart irá adicionar o número 0 ao início, se o minuto tiver apenas uma casa, ex: '05'
  // split irá dividir cada algarismo em um elemento de um array, ex: ['0', '5']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() { // altera o estado active
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.1 * 60) // da um restar no time
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => { // diminui a cada 1s o tempo atual
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time == 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time]) // function é chamada sempre que os states active ou time forem alterados, assim que o time reduzir 1s, ela já é chamada novamente e realizará o contador, atraves so setTimeout

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

      { HasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            { isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar ciclo
                </button>
              )}
          </>
        )}


    </div>

  )
}