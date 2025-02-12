import { useState, useEffect } from 'react';
import './TimeCounter.css';

const TimeCounter = () => {
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (!pause) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        const h1Element = document.querySelector('#counter');
        if (h1Element) {
          h1Element.classList.add('time-effect');
          setTimeout(() => {
            h1Element.classList.remove('time-effect');
          }, 500);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pause]);

  return (
    <div>
      <h1 id="counter">{time}</h1>
      <button onClick={() => setPause(!pause)}>{pause ? 'Play' : 'Pause'}</button>
    </div>
  );
};

export default TimeCounter;