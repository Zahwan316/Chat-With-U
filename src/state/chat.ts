import { create } from "zustand";

type chatStructure = {
    id: string,
    type: "text" | "file",
    body: string,
    time: string,
    user_target_id?: string,
    user_from_id: string
    sentBy: "me" | "other",
    created_Date: string,
    file?:string
}

type state = {
    chat:Array<chatStructure>,
    sessionChat: string
}

type action = {
    addChat:(chatvalue:chatStructure) => void,
    setSessionChat:(data: string) => void
}

const useChatStore = create<state & action>((set) => ({
    chat:[],
    sessionChat:"",
    addChat:(chatvalue) => set((state) => ({chat:[...state.chat,chatvalue]})),
    setSessionChat:(data: string) => set(() => ({sessionChat:data}))
}))

export default useChatStore