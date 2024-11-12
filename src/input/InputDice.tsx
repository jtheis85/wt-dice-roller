import React from "react";
import "./button.css";
import "./input.css";
import addDice from "../assets/add-dice.svg";

interface Props {}

const InputDice: React.FC<Props> = ({}) => {
  return (
    <div>
      <button className="button-add-dice minimal">
        <img src={addDice} />
      </button>
      <input className="input-dice" placeholder="/r 2d20kh1+1d4+5" />
    </div>
  );
};

export default InputDice;
