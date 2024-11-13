import { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./assets/logo.webp";
import InputDice from "./input/InputDice";
import { io } from "socket.io-client";
import ChatBubble from "./chat/ChatBubble";

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

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const chatMessagesRef: React.MutableRefObject<ChatMessage[]> = useRef<
    ChatMessage[]
  >([]);
  const updateChatMessages = (msg: ChatMessage) => {
    const newChatMessages = [...chatMessagesRef.current, msg];
    chatMessagesRef.current = newChatMessages;
    setChatMessages(newChatMessages);
  };

  useEffect(() => {
    const getToken = async () => {
      const res = await fetch("http://3.92.126.7:5000/api/access-token", {
        method: "POST",
      });

      const json = await res.json();

      setAccessToken(json.accessToken);
    };
    if (!accessToken) {
      getToken();
    }
    const socket = io("http://3.92.126.7:5000");
    socket.connect();
    socket.on("diceRoll", (msg) => updateChatMessages(msg));
  }, []);

  const onRoll = async (diceNotation: string) => {
    fetch(
      `http://3.92.126.7:5000/api/dice-rolls/${diceNotation}/?accessToken=${accessToken}&verbose=true`,
      {
        method: "GET",
      }
    );
  };

  return (
    <div className="app">
      <header>
        <img className="logo" src={logo} />
      </header>
      <div className="app-body">
        <div className="chat-window">
          <div className="chat-messages">
            {chatMessages.map((chatMessage, i) => (
              <ChatBubble
                key={`${i}-${chatMessage.timestamp}`}
                {...{ chatMessage }}
                isSenderSelf
              />
            ))}
          </div>
          <InputDice {...{ accessToken, onRoll }} />
        </div>
      </div>
    </div>
  );
}

export default App;
