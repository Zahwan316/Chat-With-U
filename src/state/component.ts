import { create } from "zustand"

type state = {
    infoMenuActive: boolean,
    hoverMenuActive: boolean,
    newChatMenuActive: boolean,
    profileMenuActive: boolean,
    statusMenuActive: boolean,
    statusModalActive: boolean,
}

type action = {
    setInfoMenuActive: () => void,
    setHoverMenuActive: () => void
    setNewChatMenuActive: () => void,
    setProfileMenuActive:() => void,
    setStatusMenuActive: () => void,
    setStatusModalActive:() => void,
}

const useComponentStore = create<state & action>((set) => ({
    infoMenuActive:false,
    hoverMenuActive: false,
    newChatMenuActive: false,
    profileMenuActive: false,
    statusMenuActive: false,
    statusModalActive: false,

    setInfoMenuActive:() => set((state) => ({infoMenuActive:!state.infoMenuActive})),
    setHoverMenuActive:() => set((state) => ({hoverMenuActive:!state.hoverMenuActive})),
    setNewChatMenuActive:() => set((state) => ({newChatMenuActive:!state.newChatMenuActive})),
    setProfileMenuActive:() => set((state) => ({profileMenuActive:!state.profileMenuActive})),
    setStatusMenuActive:() => set((state) => ({statusMenuActive:!state.statusMenuActive})),
    setStatusModalActive:() => set((state) => ({statusModalActive:!state.statusModalActive}))
}))

export default useComponentStore