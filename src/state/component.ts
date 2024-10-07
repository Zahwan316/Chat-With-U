import { create } from "zustand"

type state = {
    infoMenuActive: boolean,
    hoverMenuActive: boolean,
    newChatMenuActive: boolean,
}

type action = {
    setInfoMenuActive: () => void,
    setHoverMenuActive: () => void
    setNewChatMenuActive: () => void
}

const useComponentStore = create<state & action>((set) => ({
    infoMenuActive:false,
    hoverMenuActive: false,
    newChatMenuActive: false,
    setInfoMenuActive:() => set((state) => ({infoMenuActive:!state.infoMenuActive})),
    setHoverMenuActive:() => set((state) => ({hoverMenuActive:!state.hoverMenuActive})),
    setNewChatMenuActive:() => set((state) => ({newChatMenuActive:!state.newChatMenuActive})),
}))

export default useComponentStore