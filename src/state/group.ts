import {create} from "zustand"
import group from "../types/group"
import MemberGroup from "../types/memberGroup"

type state = {
    memberGroup: MemberGroup[],
    allGroup: group[],
}

type action = {
    setMemberGroup:(data: MemberGroup[]) => void
    setAllGroup:(data: group[]) => void
}

const useGroupStore = create<state & action>((set) => ({
    memberGroup:[],
    allGroup:[],

    setMemberGroup:(data: MemberGroup[]) => set(() => ({memberGroup:data})),
    setAllGroup:(data: group[]) => set(() => ({allGroup:data}))
}))

export default useGroupStore