import React, { useRef, useState } from 'react'
import '../components/TelaJogavel.css'

const TelaJogavel = ({verificarletras , palavra , categoria , letras , tentativaAcertadas , tentativaErradas , tentativasRestantes , pontos}) => {

  const [letra , setLetra] = useState()
  const letraInputRef = useRef(null)

  const submitLetra = (e) =>{

    e.preventDefault()

    letraInputRef.current.focus()

    verificarletras(letra)

    setLetra("")
  }

  return (
    <div className="game">
    <p className="points">
      Pontuacao : {pontos}
    </p>

    <h1>Adivinha a palavra</h1>

    <h3 className="tip">
      Dica sobre a palavra : <span>{categoria}</span>
    </h3>

    <p>Voce ainda tem {tentativasRestantes} tentativas</p>

    <div className="wordContainer">
      {letras.map((letra , i) => (
        tentativaAcertadas.includes(letra) ? 
        (<span key={i} className="letter">{letra}</span>) : 
        (<span key={i} className="blankSquare">{}</span>)
      ))}
    </div>


    <div className="letterContainer">
      <p>Tente Adivinha uma letra da palavra</p>
        <form>
          <input 
          type="text"
          name='letra' 
          maxLength={1}
          required 
          ref={letraInputRef}
          value={letra || ''}
          onChange={(e)=> setLetra(e.target.value) }
          />
        </form>
    

      <button type='submit' onClick={submitLetra} >Jogar!</button>
    </div>

    <div className="wrongLettersContainer">
          <p>Letras ja usadas:</p>
          {tentativaErradas.map((letra , i ) => (
             <span key={i}>{letra},</span>
          ))}
      </div>
   

  </div>
  )
}

export default TelaJogavel