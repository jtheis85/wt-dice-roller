import "./App.css";
import logo from "./assets/logo.webp";
import InputDice from "./input/InputDice";

function App() {
  return (
    <div className="app">
      <header>
        <img className="logo" src={logo} />
      </header>
      <div className="app-body">
        <div className="chat-window">
          <InputDice />
        </div>
      </div>
    </div>
  );
}

export default App;
