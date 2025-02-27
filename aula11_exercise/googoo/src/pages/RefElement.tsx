import { useRef } from 'react';

const RefElement = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        console.warn(inputRef.current);
    }

    return (
        <div>
            <h1>Ref Element Example</h1>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}

export default RefElement;