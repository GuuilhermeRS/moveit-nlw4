import { useState } from 'react'

// inicio primeira aula, conceitos sobre React

interface ButtonProps {
  color: string;
  children: string;
}

export function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(1)

  function increment() {
    setCounter(counter + 1)// cria um novo valor para o counter, e não altera seu valor inicial
  }

  return (
    // {props.children} faz com que meu button recebe conteúdo entre as tags
    <button
      type="button"
      style={{ backgroundColor: props.color }}
      onClick={increment}>
      {props.children} <strong>{counter}</strong>
    </button>
  )
}