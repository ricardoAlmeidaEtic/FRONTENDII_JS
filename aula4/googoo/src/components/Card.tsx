type CardProps = {
    data: {
      title: string;
      description: string;
      buttonText: string;
    };
  }
  
  const Card: React.FC<CardProps> = ({ data }) => {
    return (
      <div className="card">
        <h2 className="rainbow-text">{data.title}</h2>
        <p>{data.description}</p>
        <button onClick={() => window.alert("BOOOAS")}>{data.buttonText}</button>
      </div>
    )
  }
  
  export default Card