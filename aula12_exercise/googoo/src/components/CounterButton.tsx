import { useDispatch } from "react-redux";
import { increment } from "../redux/counterSlice";

const CounterButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>Increment</button>
  );
};

export default CounterButton;