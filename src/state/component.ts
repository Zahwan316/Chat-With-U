import { create } from "zustand"

type state = {
    infoMenuActive: boolean
}

type action = {
    setInfoMenuActive: () => void
}

const useComponentStore = create<state & action>((set) => ({
    infoMenuActive:false,
    setInfoMenuActive:() => set((state) => ({infoMenuActive:!state.infoMenuActive}))
}))

export default useComponentStore