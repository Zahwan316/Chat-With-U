type chatMain = {
    id: number,
    type: "text" | "file",
    body: string,
    time: string,
    sentBy: "me" | "other",
    file?:string
}

const dataChat: Array<chatMain> = [
    {
        id: 1,
        type: "text",
        body: 'Hi Furina',
        time: "12:00",
        sentBy: "other"
    },
    {
        id: 1,
        type: "file",
        body: '',
        time: "12:00",
        sentBy: "other",
        file:"./img/raiden.jpg"
    },
    {
        id: 1,
        type: "file",
        body: '',
        time: "12:00",
        sentBy: "other",
        file:"./img/raiden.jpg"
    },
    {
        id: 1,
        type: "file",
        body: '',
        time: "12:00",
        sentBy: "other",
        file:"./img/raiden.jpg"
    },
    {
        id: 1,
        type: "file",
        body: '',
        time: "12:00",
        sentBy: "other",
        file:"./img/raiden.jpg"
    },
    
]

export default dataChat