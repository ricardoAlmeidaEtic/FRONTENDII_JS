import React, { useState, useMemo } from "react";

const ExpensiveCalculationComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // The expensive calculation is memoized.
  const expensiveResult = useMemo(() => {
    console.log("Running expensive calculation...");
    let result = 0;
    // Simulating an expensive loop
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    return result;
  }, [count]); // Re-calculate only when 'count' changes

  return (
    <div>
      <h2>Expensive Calculation Example</h2>
      <p>Expensive result: {expensiveResult}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment Count ({count})
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

export default ExpensiveCalculationComponent;
