import "./App.css";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { BharatProvider } from "./context/BharatAiContext";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="app">
      <BharatProvider>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <ChatWindow isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {isSidebarOpen && (
           <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>
        )}
         <ToastContainer />
      </BharatProvider>
    </div>
  );
}

export default App;
