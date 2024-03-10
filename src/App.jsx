import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TelaInicial from './components/TelaInicial'
import TelaJogavel from './components/TelaJogavel'
import TelaGameOver from './components/TelaGameOver'
import {listaPalavras} from './data/palavras'

function App() {
  const estados = [
    {id: 1, name: "inicio"},
    {id: 2, name: "game"},
    {id: 3, name: "fim"},
  ]

  const [estadoTela , setEstadoTela] = useState(estados[0].name)
  const [palavras] = useState(listaPalavras)


  const [palavra , setPalavraSelecionada] = useState()
  const [categoria , setCategoriaSelecionada] = useState()
  const [letras , setLetrasSelecionada] = useState([])

  const [tentativaAcertadas , setTentativaAcertadas] = useState([])
  const [tentativaErradas , setTentativaErradas] = useState([])

  const [tentativasRestantes , setTentativasRestantes] = useState(0)
  const [pontos , setPontos] = useState(0)


  const pegarPalavraECategoria = () =>{
    const categorias = Object.keys(palavras)
    console.log(`Todas as categorias`, categorias);

    const categoriaIndividual = categorias[Math.floor(Math.random() * categorias.length)]
    console.log(`Categoria Filtrada`, [categoriaIndividual]);


    const palavraDaCategoria = palavras[categoriaIndividual]
    console.log(`Categorias de palavras`, palavraDaCategoria);

    const palavraDaCategoriaSelecionada = palavraDaCategoria[Math.floor(Math.random() * palavraDaCategoria.length)]
    console.log(`Palavra Filtrada`, [palavraDaCategoriaSelecionada]);
  
    
    return { palavra: palavraDaCategoriaSelecionada, categoria: categoriaIndividual };

  }


  const iniciarJogo = () =>{
    limparEstados()

    const {palavra , categoria} = pegarPalavraECategoria()

    let palavraSplit = palavra.split('')

    palavraSplit = palavraSplit.map((e) => e.toLowerCase());

    console.log(palavraSplit)
 
    setPalavraSelecionada(palavra)
    setCategoriaSelecionada(categoria)
    setLetrasSelecionada(palavraSplit)
   
    setEstadoTela(estados[1].name)

  
  }

  const verificarletras = (letra) =>{

    console.log(letra);

    const letrasToLowerCase = letra.toLowerCase()

    if(tentativaAcertadas.includes(letrasToLowerCase) || tentativaErradas.includes(letrasToLowerCase)){
      return console.log("nao pode jogar mesma letra")
    }

    console.log(letras.includes(letrasToLowerCase))

    if(letras.includes(letrasToLowerCase)){
     setTentativaAcertadas((letraAcertada) => [
      ...letraAcertada , letrasToLowerCase
     ])
    }
    else{
      setTentativaErradas((letraErradas) => [
        ...letraErradas , letrasToLowerCase
       ])

     setTentativasRestantes((actual) => actual - 1)  
    }

  }

  const limparEstados = () => {
    setTentativaAcertadas([]);
    setTentativaErradas([]);
  };
  

  useEffect(() =>{
    if(tentativasRestantes <=0){
      limparEstados()
      setEstadoTela(estados[2].name)
    }
  } , [tentativasRestantes])

  useEffect(() =>{
    const letraUnicas = new Set(letras);

    let sizeLetra = letraUnicas.size

  

    if(tentativaAcertadas.length === sizeLetra){
      setPontos((pontosAtuais) => pontosAtuais+= 100)

      iniciarJogo()
    }
  } , [tentativaAcertadas , letras , iniciarJogo])
 

  const jogarNovamente = () =>{
    setPontos(0)
    setTentativasRestantes(3)
    setEstadoTela(estados[0].name)
  }
  return (
   

    <div>
      {estadoTela === 'inicio' && <TelaInicial iniciarJogo={iniciarJogo} />}
      {estadoTela === 'game' && <TelaJogavel 
      verificarletras={verificarletras}
      palavra={palavra}
      categoria={categoria}
      letras={letras}
      tentativaAcertadas={tentativaAcertadas}
      tentativaErradas={tentativaErradas}
      tentativasRestantes={tentativasRestantes}
      pontos={pontos}
      />}

      {estadoTela === 'fim' && <TelaGameOver jogarNovamente={jogarNovamente} pontos={pontos} />}
    </div>
    
  )
}

export default App
