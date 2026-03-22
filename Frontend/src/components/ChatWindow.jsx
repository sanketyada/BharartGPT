import React, { useContext } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { BharatContext } from "../context/BharatAiContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { DNA } from 'react-loader-spinner'

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    id,
    setId,
    reply,
    setReply,
    backnedUrl,
    loader,
    setLoader,
  } = useContext(BharatContext);

  const getReply = async () => {
    // console.log(prompt, id);
    setLoader(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: id,
      }),
    };

    try {
      let response = await fetch(backnedUrl + "/api/chat", options);
      const res = await response.json();
      setReply(res.reply);
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="ChatWindow">
      {/* navbar */}
      <div className="navbar">
        <span>
          BharatGPT <i className="fa-solid fa-angle-down"></i>{" "}
        </span>

        <div className="userIconDIV">
          <span className="usericon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
     
     {/* Chats */}

      <p>{loader ? <DNA
visible={true}
height="80"
width="80"
ariaLabel="dna-loading"
wrapperStyle={{}}
wrapperClass="dna-wrapper"
/> : null}</p>
      <p>{reply}</p>
      <Chat />

      {/* INputBox to ask questions */}
      <div className="chatInput">
        <div className="inputBox">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Ask!"
          />
          <div onClick={() => getReply()} className="submit">
            <span>
              <i className="fa-solid fa-paper-plane"></i>
            </span>
          </div>
        </div>
        <p className="info">BharatGPT can make Mistake</p>
      </div>
    </div>
  );
}

export default ChatWindow;
