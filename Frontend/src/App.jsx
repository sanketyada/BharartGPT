import "./App.css";
import React from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { BharatProvider } from "./context/BharatAiContext";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <div className="app">
      <BharatProvider>
        <Sidebar />
        <ChatWindow />
         <ToastContainer />
      </BharatProvider>
    </div>
  );
}

export default App;
