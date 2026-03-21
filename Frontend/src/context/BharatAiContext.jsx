import { createContext } from "react"
export const BharatContext = createContext("")


export const BharatProvider = ({children})=>{

    const username="Tina Dabi"
    const post = "IAS"
    const value={username,post}
    return(
        <BharatContext.Provider value={value}>
            {children}
        </BharatContext.Provider>
    )
}

