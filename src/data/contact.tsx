type contactbody = {
    id: number,
    profile: string,
    name: string,
    lastChat: string,
    time: string,
    unreadMessage: number,
}

const dataContact: Array<contactbody> = [
    {
        id:1,
        profile:"./img/takina.jpg",
        name:"Takina",
        lastChat:"Hahaha",
        time:"03:00",
        unreadMessage:20,
    },
    {
        id:2,
        profile:"./img/raiden.jpg",
        name:"Raiden",
        lastChat:"Next time <3",
        time:"23:00",
        unreadMessage:1,
    },
]

export default dataContact