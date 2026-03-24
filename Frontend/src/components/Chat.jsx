import React, { useContext, useEffect, useState } from "react";
import { BharatContext } from "../context/BharatAiContext";
import "./Chat.css";
import Markdown from "react-markdown";
import rehypeHighlight from "https://esm.sh/rehype-highlight@6";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { prevChats, setPrevChats, newChat, setNewChat, reply } =
    useContext(BharatContext);
  const [latestReply, setLetestReply] = useState(null);


// Word by Word
  useEffect(() => {
    if (!prevChats.length || !reply) return;
    setLetestReply("");

    const content = reply.split(" "); //Spliting word by word
    let idx = 0;

    const interval = setInterval(() => {
      setLetestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [prevChats, reply]);

// // Character by character
// useEffect(() => {
//   if (!reply) return;

//   setLetestReply("");

//   let idx = 0;

//   const interval = setInterval(() => {
//     setLetestReply(reply.slice(0, idx + 1));
//     idx++;

//     if (idx >= reply.length) {
//       clearInterval(interval);
//     }
//   }, 30);

//   return () => clearInterval(interval);
// }, [reply]);
//  console.log(prevChats)


  return (
    <>
      {newChat && (
        <h1>
          Welcome To <span>BharatGPT</span>
        </h1>
      )}
      <div className="chats">


        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <Markdown rehypePlugins={rehypeHighlight}>
                {chat.content}
              </Markdown>
            )}
          </div>
        ))}


        {
         prevChats.length > 0 && latestReply !== null &&
         <div className="gptDiv" key={"idx"}>
              <Markdown rehypePlugins={rehypeHighlight}>
                {latestReply}
              </Markdown>
         </div>

        }
      </div>
    </>
  );
}

export default Chat;
