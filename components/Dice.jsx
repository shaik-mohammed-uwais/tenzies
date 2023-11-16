import "../styles/App.css";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#B9B4C7" : "#5C5470",
  };

  return (
    <div className="dice-face" style={styles} onClick={props.holddice}>
      <div className="dice-num">{props.value}</div>
    </div>
  );
}
