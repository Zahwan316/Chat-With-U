import { create } from "zustand";

type user = {
    id: string,
    fullname: string,
    username: string,
    email: string,
    //password: string,
    bio: string,
    number_phone: string,
    createdDate: string,
    image: string
}

type alluser = {
    id: string,
    fullname: string,
    username: string,
    email: string,
    bio: string,
    image: string,
    created_Date: string,
    number_phone: string,
    //password: string
}

type state = {
    userinfo: user,
    alluser: Array<alluser>,
    searchedUser: Array<user>
}

type action = {
    setuserinfo:(data:user) => void,
    setalluser:(data:Array<alluser>) => void,
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
    setalluser:(data:Array<alluser>) => set(() => ({alluser:data})),
    setsearcheduser:(data:Array<user>) => set(() => ({searchedUser:data}))
}))

export default useUserStore