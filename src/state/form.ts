import { create } from "zustand";

type state = {
    form:Record<string, string>,
}

type action = {
    setform:(name:string,value:string) => void,
    resetform:() => void
}

const useFormStore = create<state & action>((set) => ({
    form:{
        textchat:""
    },
    setform:(name:string,value:string) => set((state) => ({form:{...state.form,[name]:value}})),
    resetform:() => set(() => ({form:{textchat:""}})) 
}))

export default useFormStore