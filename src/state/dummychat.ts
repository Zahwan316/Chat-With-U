import { create } from "zustand";

type chatStructure = {
    id: number,
    type: "text" | "file",
    body: string,
    time: string,
    sentBy: "me" | "other",
    file?:string
}

type state = {
    chat:Array<chatStructure>
}

type action = {
    addChat:(chatvalue:chatStructure) => void 
}

const useChatStore = create<state & action>((set) => ({
    chat:[
    {
        id: 1,
        type: "text",
        body: 'Hi Furina',
        time: "12:00",
        sentBy: "other"
    },
    {
        id: 1,
        type: "text",
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta, nulla eu commodo rhoncus, magna nibh egestas est, sit amet pulvinar ipsum velit in sem. Mauris lectus diam, facilisis et dui non, molestie vestibulum nunc. Etiam egestas odio et convallis pulvinar. Donec ut velit non urna fermentum pulvinar. In lacus felis, tincidunt at posuere quis, fringilla vitae enim. Curabitur sed urna eget ipsum condimentum suscipit. Quisque eros justo, aliquam suscipit urna at, varius pulvinar nibh. Vivamus ultricies massa turpis, id pharetra sapien feugiat vel. Pellentesque commodo pulvinar faucibus. Sed convallis neque est, quis viverra nunc suscipit sit amet. Cras ex dui, consectetur quis lorem vitae, ornare malesuada est. Ut in mollis nunc, non aliquet massa. Donec sit amet sapien aliquam erat ullamcorper lobortis cursus quis enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a egestas ligula. Cras ac tempor lectus. Aliquam vel tortor sit amet felis egestas elementum. Sed faucibus libero dolor, et pharetra sem dictum a. Nullam vulputate neque laoreet, pretium risus vel, consequat risus. Nunc eu malesuada mauris, a ultricies nisl. Fusce mattis tempor facilisis. Sed pellentesque ut urna quis interdum. Nunc pellentesque faucibus felis id fermentum. Pellentesque ac velit vel lectus hendrerit volutpat eu et sem. Fusce porta turpis eget fermentum congue. Fusce rutrum est faucibus ipsum euismod placerat. Suspendisse pellentesque nisl non facilisis blandit. Integer rutrum egestas arcu. Nunc eget elit id risus facilisis eleifend. Mauris imperdiet condimentum tortor in dictum. Nullam bibendum lectus at nibh volutpat, eu accumsan tortor venenatis. Etiam vestibulum quis nulla in pellentesque. Sed sed nisl bibendum, varius quam at, varius odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce congue quis purus et iaculis. Maecenas vel ullamcorper ligula, in commodo augue. Phasellus sodales erat a felis facilisis dignissim. Aenean sagittis nisl ut lacus aliquet, in sagittis felis blandit. Morbi porttitor, mi ut tincidunt bibendum, nisl nunc vestibulum nisl, vel vulputate nulla quam sed libero. Vestibulum ornare felis id massa lobortis, ac pharetra purus ultricies. Pellentesque gravida eros at leo malesuada, et fringilla est sagittis. Cras imperdiet, ante vitae finibus malesuada, ante libero dignissim elit, in consequat est mauris a risus. Donec volutpat nunc at neque hendrerit dictum.',
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
    }
],
    addChat:(chatvalue) => set((state) => ({chat:[...state.chat,chatvalue]}))
}))

export default useChatStore