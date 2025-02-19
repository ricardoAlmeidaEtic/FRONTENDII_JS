import { useEffect } from "react";

const LifeCicleTest = () => {
  useEffect(() => {
    console.log("componentDidMount");
    return () => {
      console.log("componentWillUnmount");
    };
  }, []);

  return <div>Teste</div>;
};

export default LifeCicleTest;