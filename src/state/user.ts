import { create } from "zustand";
import user from "../types/user";

type state = {
    userinfo: user,
    alluser: Array<user>,
    searchedUser: Array<user>
}

type action = {
    setuserinfo:(data:user) => void,
    setalluser:(data:Array<user>) => void,
    setsearcheduser:(data:Array<user>) => void
}

const useUserStore = create<state & action>((set) => ({
    userinfo:{
        id: "",
        fullname: "",
        username: "",
        email: "",
        //password: "",
        bio: "",
        number_phone: "",
        createdDate: "",
        image: "",
    },
    alluser:[],
    searchedUser:[],

    setuserinfo:(data:user) => set(() => ({userinfo:data})),
    setalluser:(data:Array<user>) => set(() => ({alluser:data})),
    setsearcheduser:(data:Array<user>) => set(() => ({searchedUser:data}))
}))

export default useUserStore