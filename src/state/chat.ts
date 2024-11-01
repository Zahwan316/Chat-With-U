import { create } from "zustand";
import chat from "../types/chat";

type state = {
    chat:Array<chat>,
    sessionChat: string,
    unreadChat:chat[],
}

type action = {
    addChat:(chatvalue:chat) => void,
    setSessionChat:(data: string) => void,
    removeAllChat:() => void,
    setunreadchat:(data:chat[]) => void,
}

const useChatStore = create<state & action>((set) => ({
    chat:[],
    sessionChat:"",
    unreadChat:[],
    
    addChat:(chatvalue) => set((state) => ({chat:[...state.chat,chatvalue]})),
    setSessionChat:(data: string) => set(() => ({sessionChat:data})),
    removeAllChat:() => set(() => ({chat:[]})),
    setunreadchat:(data:chat[]) => set(() => ({unreadChat:data}))
}))

export default useChatStore