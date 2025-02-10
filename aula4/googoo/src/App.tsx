import Card from './components/Card'
import Banner from './components/Banner'
import './App.css'

const cardProps = {
  title: 'Card Title',
  description: 'This is a description of the card.',
  buttonText: 'Click Me'
}

const bannerProps = {
  title: 'Banner Title',
  text: 'This is a description of the banner.'
}

function App() {
  return (
    <>
      <Banner data= {bannerProps} />    
      <h1>Vite + React</h1>
      <Card data= {cardProps} />
    </>
  )
}

export default App