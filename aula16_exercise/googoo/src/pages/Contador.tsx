import { useRef, useState, useEffect } from 'react';

const Contador = () => {
    const [count, setCount] = useState(0);
    const lastCounter = useRef(0);

    useEffect(() => {
        lastCounter.current = count;
    }, [count]);

    return (
        <div>
            <h1>Contador</h1>
            <p>Contador atual: {count}</p>
            <p>Contador anterior: {lastCounter.current}</p>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Incrementar</button>
        </div>
    );
}

export default Contador;