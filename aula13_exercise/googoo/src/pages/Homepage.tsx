import Chat from '../components/Chat'
import LifeCicleTest from '../components/LifeCicleTest'
import AnimacaoBasica from '../components/AnimacaoBasica'
import ListaAnimada from '../components/ListaAnimada'
import ScrollAnimation from '../components/ScrollAnimation'
import { useState } from 'react'


function App() {
  const [show, setShow] = useState(true)
  return (
    <>
      <h1>Homepage</h1>
      <Chat/>
      <button onClick={() => setShow(!show)}>Toggle LifeCicleTest</button>
      {show && <LifeCicleTest/>}
      <AnimacaoBasica/>
      <ListaAnimada/>
      <ScrollAnimation/>
    </>
  )
}

export default App