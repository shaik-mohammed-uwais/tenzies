import "../styles/App.css";

export default function Score(props) {
  return (
    <div className="scores-container">
      <div className="current-score">
        <h2>{props.rollsocc}</h2>
        <h4>Current</h4>
      </div>
      <div className="high-score">
        <h2>{props.bestroll}</h2>
        <h4>Least</h4>
      </div>
    </div>
  );
}
