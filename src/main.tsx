// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // Disabling strict mode here to prevent useEffect from running twice,
  // causing multiple socketio connections. There's better ways to handle this,
  // but this is faster!
  // <StrictMode>
  <App />
  // </StrictMode>
);
