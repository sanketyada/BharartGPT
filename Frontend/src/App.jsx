import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { BharatProvider } from "./context/BharatAiContext";

function App() {
  return (
    <div className="app">
      <BharatProvider>
        <Sidebar />
        <ChatWindow />
      </BharatProvider>
    </div>
  );
}

export default App;
