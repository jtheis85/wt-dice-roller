import { useEffect, useRef, useState } from "react";
import "./App.css";
import logo from "./assets/logo.webp";
import InputDice from "./input/InputDice";

import ChatBubble from "./chat/ChatBubble";
import { ChatMessage, fetchToken, listenToSocketIo, sendRoll } from "./api/api";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const chatMessagesRef: React.MutableRefObject<ChatMessage[]> = useRef<
    ChatMessage[]
  >([]);
  // Unfortunate dance to keep a ref in sync with the state, so we can update
  // the state in response to socket.io messages. With just setting the state
  // directly, the chatMessages state variable was being captured in the
  // useEffect closure, resulting in a single chat message being added to an
  // "always empty" array. Look into better ways to do this.
  const updateChatMessages = (msg: ChatMessage) => {
    const newChatMessages = [...chatMessagesRef.current, msg];
    chatMessagesRef.current = newChatMessages;
    setChatMessages(newChatMessages);
  };

  // Initialize the app with the API, getting a token and connecting to the
  // socket.io stream
  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken();
      setAccessToken(token);
      listenToSocketIo((msg) => updateChatMessages(msg));
    };
    getToken();
  }, []);

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
          <InputDice
            {...{ accessToken }}
            onRoll={(diceNotation) => sendRoll(diceNotation, accessToken)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
