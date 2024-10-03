import { create } from "zustand";

type user = {
    id: string,
    fullname: string,
    username: string,
    email: string,
    password: string,
    bio: string,
    number_phone: string,
    createdDate: string,
    image: string
}

type state = {
    userinfo: user
}

type action = {
    setuserinfo:(data:user) => void
}

const useUserStore = create<state & action>((set) => ({
    userinfo:{
        id: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        bio: "",
        number_phone: "",
        createdDate: "",
        image: ""
    },
    setuserinfo:(data:user) => set(() => ({userinfo:data}))
}))

export default useUserStore