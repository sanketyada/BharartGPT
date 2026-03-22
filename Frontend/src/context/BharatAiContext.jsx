import { createContext, useState } from "react"
export const BharatContext = createContext("")
import { v4 as uuidv4 } from 'uuid';

export const BharatProvider = ({children})=>{
   
    const [prompt,setPrompt] = useState("")
    const [reply,setReply]  =useState("")
    const [id,setId] = useState(uuidv4())
    const [loader,setLoader] = useState(false)
    const backnedUrl = import.meta.env.VITE_BACKEND_URL




    const value={prompt,setPrompt,id,setId,reply,setReply,backnedUrl,loader,setLoader}
    return(
        <BharatContext.Provider value={value}>
            {children}
        </BharatContext.Provider>
    )
}

