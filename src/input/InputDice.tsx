import React, { useState } from "react";
import "./button.css";
import "./input.css";

import addDice from "../assets/add-dice.svg";

import d20 from "../assets/d20.svg";
import d100 from "../assets/d100.svg";
import d10 from "../assets/d10.svg";
import d8 from "../assets/d8.svg";
import d6 from "../assets/d6.svg";
import d4 from "../assets/d4.svg";

interface Props {}

const InputDice: React.FC<Props> = ({}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <div className="input-dice">
      {isShowMenu && (
        <div className="dice-popover">
          <button className="button-dice minimal inactive">
            <div>
              <img src={d20} />
            </div>{" "}
            -d20
          </button>
          <button className="button-dice minimal inactive">
            <div>
              <img src={d100} />
            </div>{" "}
            -d100
          </button>
          <button className="button-dice minimal inactive">
            <div>
              <img src={d10} />
            </div>{" "}
            -d10
          </button>
          <button className="button-dice minimal inactive">
            <div>
              <img src={d8} />
            </div>{" "}
            -8
          </button>
          <button className="button-dice minimal inactive">
            <div>
              <img src={d6} />
            </div>{" "}
            -d6
          </button>
          <button className="button-dice minimal inactive">
            <div>
              <img src={d4} />
            </div>{" "}
            -d4
          </button>
          <button className="button-roll standard">Roll</button>
        </div>
      )}
      <button
        onClick={() => setIsShowMenu(!isShowMenu)}
        className="button-add-dice minimal"
      >
        <img src={addDice} />
      </button>
      <input placeholder="/r 2d20kh1+1d4+5" />
    </div>
  );
};

export default InputDice;
