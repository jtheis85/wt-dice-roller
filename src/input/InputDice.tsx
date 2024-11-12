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

type Sides = 20 | 100 | 10 | 8 | 6 | 4;

// Map these icons to make them easy to look up
const iconsBySides = {
  20: d20,
  100: d100,
  10: d10,
  8: d8,
  6: d6,
  4: d4,
};

interface Props {}

const InputDice: React.FC<Props> = ({}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [diceCounts, setDiceCounts] = useState({
    20: 0,
    100: 0,
    10: 0,
    8: 0,
    6: 0,
    4: 0,
  });

  const isRollEnabled = Object.keys(diceCounts).some(
    (sides) => diceCounts[parseInt(sides) as Sides] > 0
  );

  return (
    <div className="input-dice">
      {isShowMenu && (
        <div className="dice-popover">
          {([20, 100, 10, 8, 6, 4] as Sides[]).map((sides) => {
            const quantity = diceCounts[sides];
            return (
              <button
                key={sides}
                className={`button-dice minimal ${
                  quantity < 1 ? "inactive" : ""
                }`}
                // This is off spec. Would probably discuss with team before
                // adding, but convenient for testing.
                // Right Click
                onContextMenu={(e) => {
                  e.preventDefault();

                  // Don't allow negatives
                  if (quantity === 0) return;

                  setDiceCounts({
                    ...diceCounts,
                    [sides]: quantity - 1,
                  });
                }}
                onClick={(e) => {
                  setDiceCounts({
                    ...diceCounts,
                    [sides]: quantity + 1,
                  });
                }}
              >
                <div>
                  <img src={iconsBySides[sides]} />
                </div>{" "}
                {quantity > 0 ? quantity : "-"}d{sides}
              </button>
            );
          })}
          <button disabled={!isRollEnabled} className="button-roll standard">
            Roll
          </button>
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
