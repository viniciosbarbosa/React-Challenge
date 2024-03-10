import React from 'react'
import "./TelaInicial.css"

const TelaInicial = ({iniciarJogo}) => {
  return (
    <div className='inicio'>
      <h1>Palavra Secreta</h1>
      <span>Clique no botao para jogar</span>
      <button onClick={iniciarJogo}>Começar a Jogar</button>
    </div>
  )
}

export default TelaInicial