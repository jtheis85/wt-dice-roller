import { io } from "socket.io-client";

const HOST = "http://3.92.126.7:5000";

export type ChatMessage = {
  notation: string;
  sum: number;
  results: [
    | {
        type: "dice";
        count: number;
        sides: number;
        allRolls: [number];
        keptRolls: [number];
        total: number;
      }
    | {
        type: "constant";
        result: number;
      }
  ];
  timestamp: string;
};

export const fetchToken = async () => {
  const res = await fetch("http://3.92.126.7:5000/api/access-token", {
    method: "POST",
  });

  const json = await res.json();

  return json.accessToken;
};

export const listenToSocketIo = (onDiceRoll: (msg: ChatMessage) => void) => {
  const socket = io(HOST);
  socket.connect();
  socket.on("diceRoll", (msg: ChatMessage) => onDiceRoll(msg));
};

export const sendRoll = async (diceNotation: string, accessToken: string) => {
  fetch(
    `${HOST}/api/dice-rolls/${diceNotation}/?accessToken=${accessToken}&verbose=true`,
    {
      method: "GET",
    }
  );
};
