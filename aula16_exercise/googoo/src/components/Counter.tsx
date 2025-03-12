import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>Counter</h1>
      <p>{counter}</p>
    </div>
  );
};

export default Counter;