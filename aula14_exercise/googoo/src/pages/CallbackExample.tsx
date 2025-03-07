import { useState, useCallback } from "react";

const ChildComponent = ({ execute }: { execute: () => void }) => {
    console.log("ChildComponent render");
    return (
        <button onClick={execute}>Click me!</button>
    );
}

const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

    return (
        <div>
            <h1>Count: {count}</h1>
            <ChildComponent execute={increment} />
        </div>
    );
}

export default ParentComponent;