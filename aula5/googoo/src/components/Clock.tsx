import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState('Ricardo');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(`Name changed to: ${name}`);
  }, [name]);

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h2>{name}</h2>
    </div>
  )
}

export default Clock