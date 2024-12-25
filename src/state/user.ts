import { create } from "zustand";
import user from "../types/user";
import onlineUser from '../types/onlineUser';

type state = {
    userinfo: user,
    alluser: Array<user>,
    searchedUser: Array<user>,
    userOnline: Array<onlineUser>
}

type action = {
    setuserinfo: (data:user) => void,
    setalluser: (data:Array<user>) => void,
    setsearcheduser: (data:Array<user>) => void
    setUserOnline: (data:Array<onlineUser>) => void,
    resetSearchedUser: () => void,
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
    alluser: [],
    searchedUser: [],
    userOnline: [],

    setuserinfo: (data:user) => set(() => ({userinfo:data})),
    setalluser: (data:Array<user>) => set(() => ({alluser:data})),
    setsearcheduser: (data:Array<user>) => set(() => ({searchedUser:data})),
    setUserOnline: (data:Array<onlineUser>) => set(() => ({userOnline:data})),

    resetSearchedUser: () => set(() => ({searchedUser: []}))
}))

export default useUserStore