import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.webp";
import InputDice from "./input/InputDice";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [rollResults, setRollResults] = useState({});

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
  }, [accessToken]);

  const onRoll = async (diceNotation: string) => {
    const res = await fetch(
      `http://3.92.126.7:5000/api/dice-rolls/${diceNotation}/?accessToken=${accessToken}&verbose=true`,
      {
        method: "GET",
      }
    );

    const json = await res.json();

    setRollResults(json);
  };

  return (
    <div className="app">
      <header>
        <img className="logo" src={logo} />
      </header>
      <div className="app-body">
        <div className="chat-window">
          {JSON.stringify(rollResults)}
          <InputDice {...{ accessToken, onRoll }} />
        </div>
      </div>
    </div>
  );
}

export default App;
