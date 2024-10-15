import { create } from "zustand";
import chat from "../types/chat";

type state = {
    chat:Array<chat>,
    sessionChat: string
}

type action = {
    addChat:(chatvalue:chat) => void,
    setSessionChat:(data: string) => void,
    removeAllChat:() => void,
}

const useChatStore = create<state & action>((set) => ({
    chat:[],
    sessionChat:"",
    addChat:(chatvalue) => set((state) => ({chat:[...state.chat,chatvalue]})),
    setSessionChat:(data: string) => set(() => ({sessionChat:data})),
    removeAllChat:() => set(() => ({chat:[]})),
}))

export default useChatStore