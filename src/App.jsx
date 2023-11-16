import React, { useEffect, useState } from "react";
import "../styles/App.css";
import Dice from "../components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Score from "../components/Score";
import "../styles/index.css";

function App() {
  const [rolls, setRolls] = React.useState(0);
  const [tenzies, settenzies] = React.useState(false);
  const [dice, setdice] = React.useState(newDice());
  const [bestRolls, setBestRolls] = React.useState(
    JSON.parse(localStorage.getItem("bestRolls")) || 0
  );

  //================ hold dice =======================

  function HoldDice(id) {
    setdice((prev) =>
      prev.map((pre) => {
        return id === pre.id ? { ...pre, isHeld: !pre.isHeld } : pre;
      })
    );
  }

  React.useEffect(() => {
    const allisheld = dice.every((die) => die.isHeld);
    const startval = dice[0].value;
    const allvalues = dice.every((die) => die.value === startval);
    if (allisheld && allvalues) {
      settenzies(true);
    }
  }, [dice]);

  //================ new dice =======================

  function genrateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  //================ dice element =======================

  const DiceElements = dice.map((val) => (
    <Dice
      value={val.value}
      isHeld={val.isHeld}
      key={val.id}
      holddice={() => HoldDice(val.id)}
    />
  ));

  //================ genreting new dice =======================

  function newDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(genrateNewDice());
    }
    return diceArr;
  }

  function rolldice() {
    setRolls((prev) => prev + 1);
    if (tenzies) {
      settenzies(false);
      setdice(newDice);
      setRecords();
      setRolls(0);
    } else {
      setdice((prev) =>
        prev.map((pre) => {
          return pre.isHeld ? pre : genrateNewDice();
        })
      );
    }
  }
  //================ high score =======================

  function setRecords() {
    if (!bestRolls || rolls < bestRolls) {
      setBestRolls(rolls);
    }
  }
  React.useEffect(() => {
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
  }, [bestRolls]);

  //================ main element =======================

  return (
    <main>
      <div className="content-wrapper">
        {tenzies && <Confetti />}
        <h1 className="title">TENZIES</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <Score rollsocc={rolls} bestroll={bestRolls} />
        <div className="dice-container">{DiceElements}</div>
        <button className="blend-borde" onClick={rolldice}>
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </div>
    </main>
  );
}

export default App;
