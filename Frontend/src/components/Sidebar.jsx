import React, { useContext, useState } from "react";
import { BharatContext } from "../context/BharatAiContext";
import "./Sidebar.css";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const {
    allThreads,
    backnedUrl,
    setPrevChats,
    setNewChat,
    setPrompt,
    setId,
    setReply,
    setAllThreads,id
  } = useContext(BharatContext);

  async function getWholeChat(threadId, messages) {
    // console.log(threadId, messages);
    try {
      setId(threadId);
      let response = await fetch(backnedUrl + `/api/thread/${threadId}`);
      const res = await response.json();
      const data = res.messages || [];
      setPrevChats([...data, 1]);
    } catch (error) {
      console.log(error);
      toast.error(error.messages);
    }
  }

  function initNewChat() {
    setNewChat(true);
    setPrompt("");
    setReply(" ");
    setId(uuidv4());
    setPrevChats([]);
  }

  async function deleteChat(threadId) {
    // console.log(threadId)
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        backnedUrl + `/api/thread/${threadId}`,
        options,
      );
      const res = await response.json();
      toast.success("Thread get Delted");
        setAllThreads(prev => prev.filter(t => t.threadId !== threadId));
      if(threadId ===id ){
        initNewChat()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <div>
    //   {" "}
    //   <div className={showSideBar ? "sidebar" : "sidebarX"}>
    //     <div className="hamburgerSection">
    //       <button onClick={() => setShowSideBar(!showSideBar)}>
    //         {showSideBar ? "X" : "O"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <section className="sidebar">
      {/* new Chat Button */}
      <button onClick={initNewChat}>
        <img className="logo" src="src/assets/blacklogo.png" alt="" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>
      {/* History */}
      {/* {
        console.log(allThreads)
      } */}
      <ul className="histroy">
        {allThreads?.map((chat, idx) => (
          <li
            className={chat.threadId === id ? "highlight":null }
            key={idx}
            onClick={() => getWholeChat(chat.threadId, chat.messages)}
          >
            {chat.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>
      {/* Comapny Name */}
      <div className="sign">
        <p>By BharatGPT</p>
      </div>
    </section>
  );
}

export default Sidebar;
