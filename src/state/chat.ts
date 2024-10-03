import { create } from "zustand";

type chatStructure = {
    id: number,
    type: "text" | "file",
    body: string,
    time: string,
    sentBy: "me" | "other",
    userId: string,
    file?:string
}

type state = {
    chat:Array<chatStructure>
}

type action = {
    addChat:(chatvalue:chatStructure) => void 
}

const useChatStore = create<state & action>((set) => ({
    chat:[],
    addChat:(chatvalue) => set((state) => ({chat:[...state.chat,chatvalue]}))
}))

export default useChatStore