import {create} from "zustand"
import status from "../types/status"

type state = {
    status: Array<status>
}

type action = {
    setstatus: (data: status) => void
    addstatus: (data: Array<status>) => void
}

const useStatusStore = create<state & action>((set) => ({
    status: [],

    addstatus:(data: Array<status>) => set(() => ({status:data})),
    setstatus:(data) => set((state) => ({status:[...state.status,data]})),
}))

export default useStatusStore