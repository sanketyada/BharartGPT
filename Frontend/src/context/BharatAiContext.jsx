import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const BharatContext = createContext("");
import { v4 as uuidv4 } from "uuid";

export const BharatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(" ");
  const [id, setId] = useState(uuidv4());
  const [loader, setLoader] = useState(false);
  const backnedUrl = import.meta.env.VITE_BACKEND_URL;

  //for Showing Chats
  const [prevChats, setPrevChats] = useState([]); //Store all and current Threads
  const [newChat, setNewChat] = useState(true);

  //Threds
  const [allThreads, setAllThreads] = useState([]);


  useEffect(() => {
    try {
      async function fetchData() {
        // You can await here
        let response = await fetch(backnedUrl + "/api/thread");
        const res = await response.json();
        const data = res.threads
        setAllThreads(data || []);
      }
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [id]);


  const value = {
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
    prompt,
    setPrompt,
    id,
    setId,
    reply,
    setReply,
    backnedUrl,
    loader,
    setLoader,
    allThreads,
    setAllThreads,
  };
  return (
    <BharatContext.Provider value={value}>{children}</BharatContext.Provider>
  );
};
