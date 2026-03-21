import React from "react";
import "./ChatWindow.css";
import Chat from "./Chat";

function ChatWindow() {
  return (
    <div className="ChatWindow">
      <div className="navbar">

        <span>
          BharatGPT <i class="fa-solid fa-angle-down"></i>{" "}
        </span>
        
        <div className="userIconDIV">
          <span className="usericon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
        

      </div>

      <Chat />

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder="Ask!" />
          <div className="submit">
            <span><i class="fa-solid fa-paper-plane"></i></span>
          </div>
        </div>
        <p className="info">
          BharatGPT can make Mistake
        </p>
      </div>


    </div>
  );
}

export default ChatWindow;
