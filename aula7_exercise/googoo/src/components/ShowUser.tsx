import { useState, useEffect } from 'react';

const ShowUser = () => {
  const [user, setUser] = useState("Ricardo");
  const [showUser, setShowUser] = useState(true);

  return (
    <div>
      <button onClick={() => setShowUser(!showUser)}>{showUser ? 'Esconder' : 'Mostrar'}</button>
      {showUser && (
        <>
          <div className="card">
            <h2>User: { user }</h2>
          </div>
        </>
      )}
    </div>
  )
}

export default ShowUser