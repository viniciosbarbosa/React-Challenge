import React from 'react'

const TelaGameOver = ({jogarNovamente , pontos}) => {
  return (
    <div>
    <h1>GameOver</h1>
    <h2>Sua Pontuacao foi <span>{pontos}</span></h2>
    <button onClick={jogarNovamente}>Resetar</button>
    </div>
  )
}

export default TelaGameOver