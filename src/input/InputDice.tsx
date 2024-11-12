import "./input.css";

import React from "react";

interface Props {}

const InputDice: React.FC<Props> = ({}) => {
  return <input className="input-dice" placeholder="/r 2d20kh1+1d4+5" />;
};

export default InputDice;
