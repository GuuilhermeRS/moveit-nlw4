import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({children}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false) // estado para countdown ativo ou não
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60) // arredonda o número para baixo, para exibir apenas os minutos
  const seconds = time % 60 // pega o resto da divisão, apenas os segundos

  function startCountdown() { // altera o estado active
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(0.05 * 60) // da um restar no time
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}