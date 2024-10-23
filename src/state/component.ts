import { create } from "zustand"

type state = {
    infoMenuActive: boolean,
    hoverMenuActive: boolean,
    newChatMenuActive: boolean,
    profileMenuActive: boolean,
    statusMenuActive: boolean,
}

type action = {
    setInfoMenuActive: () => void,
    setHoverMenuActive: () => void
    setNewChatMenuActive: () => void,
    setProfileMenuActive:() => void,
    setStatusMenuActive: () => void,
}

const useComponentStore = create<state & action>((set) => ({
    infoMenuActive:false,
    hoverMenuActive: false,
    newChatMenuActive: false,
    profileMenuActive: false,
    statusMenuActive: false,

    setInfoMenuActive:() => set((state) => ({infoMenuActive:!state.infoMenuActive})),
    setHoverMenuActive:() => set((state) => ({hoverMenuActive:!state.hoverMenuActive})),
    setNewChatMenuActive:() => set((state) => ({newChatMenuActive:!state.newChatMenuActive})),
    setProfileMenuActive:() => set((state) => ({profileMenuActive:!state.profileMenuActive})),
    setStatusMenuActive:() => set((state) => ({statusMenuActive:!state.statusMenuActive}))
}))

export default useComponentStore