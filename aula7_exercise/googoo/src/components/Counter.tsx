import { useState, useEffect } from 'react';

const Counter = () => {
  const [number, setNumber] = useState(0);
  const [showUser, setShowUser] = useState(true);

  useEffect(() => {
    console.log(`Number changed to: ${number}`);
  }, [number]);

  function add() {
    setNumber(number + 1);
  }

  return (
    <div>
      <button onClick={() => setShowUser(!showUser)}>{showUser ? 'Esconder' : 'Mostrar'}</button>
      {showUser && (
        <>
          <div className="card">
            <h2>Ricardo: { number } anos!</h2>
            <button onClick={add}>click</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Counter