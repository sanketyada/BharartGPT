import React, { useContext, useEffect } from "react";
import "./ChatWindow.css";
import Chat from "./Chat";
import { BharatContext } from "../context/BharatAiContext";
import { toast } from "react-toastify";
import { DNA } from "react-loader-spinner";
import { TypeAnimation } from "react-type-animation";
import Markdown from "react-markdown";
import rehypeHighlight from "https://esm.sh/rehype-highlight@6";

import Typewriter from "typewriter-effect";

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
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
  } = useContext(BharatContext);

  const getReply = async () => {
    // console.log(prompt, id);
    setNewChat(false)
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
      // // Added Fallback
      const assistantReply = res.reply || "Sorry, I couldn't process that.";
      setReply(assistantReply);
      setLoader(false);
      setPrevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: res.reply,
        },
      ]);

      setPrompt("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   setPrevChats((prev) => [
  //     ...prev,
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //     {
  //       role: "assistant",
  //       content: reply,
  //     },
  //   ]);

  //   setPrompt("");
  // }, [reply]);

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
      <Chat />
      <p>
        {loader ? (
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        ) : null}
      </p>

      {/* INputBox to ask questions */}
      <div className="chatInput">
        <div className="inputBox">
          <input
          
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Ask!"
          />
          <div
            
            onClick={() => getReply()}
            className="submit"
          >
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
