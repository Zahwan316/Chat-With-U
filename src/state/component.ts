import { create } from "zustand"

type state = {
    infoMenuActive: boolean,
    hoverMenuActive: boolean
}

type action = {
    setInfoMenuActive: () => void,
    setHoverMenuActive: () => void
}

const useComponentStore = create<state & action>((set) => ({
    infoMenuActive:false,
    hoverMenuActive: false,
    setInfoMenuActive:() => set((state) => ({infoMenuActive:!state.infoMenuActive})),
    setHoverMenuActive:() => set((state) => ({hoverMenuActive:!state.hoverMenuActive}))
}))

export default useComponentStore