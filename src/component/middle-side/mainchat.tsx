import { useEffect, useState } from "react"
import useChatStore from "../../state/chat"
import BubbleChatComponent from "./component/bubblechat"
import { io } from "socket.io-client"
import useUserStore from "../../state/user"

type chat = {
  id: string,
  type: "text" | "file",
  body: string,
  time: string,
  user_target_id?: string,
  user_from_id: string,
  created_Date: string,
  sentBy: "me" | "other",
  file?:string
}

const socketio = io("http://localhost:3000")
const MainChatComponent = () => {
  const chatdata = useChatStore((state) => state.chat)
  const addchat = useChatStore((state) => state.addChat)
  const SessionChat = useChatStore((state) => state.sessionChat)
  const userinfo = useUserStore((state) => state.userinfo)
  const [chatfilter,setchatfilter] = useState<Array<chat>>()

 

  useEffect(() =>{
    socketio.on("message",(message) => {
      addchat(message)
    })
  },[])

  useEffect(() => {
    const filtered: chat = chatdata.filter((item) => item?.user_from_id === SessionChat || item?.user_from_id === userinfo?.id && item?.user_target_id === SessionChat || item?.user_target_id === userinfo?.id)
    setchatfilter(filtered)
  },[chatdata])
 
  useEffect(() => {
    console.log(chatfilter)
  })

  return(
    <div className={`w-full h-[75vh] p-4 overflow-y-auto relative ${SessionChat === "" && "hidden"}`}>
        {
            chatfilter?.map((item) => 
              
                <BubbleChatComponent
                    id={item.id}
                    body={item.body}
                    sentBy={item.sentBy}
                    time={item.time}
                    type={item.type}
                    file={item.file}
                    user_from_id={item.user_from_id}
                    user_target_id={item.user_target_id}
                />
               
              )
        }
    </div>
  )
}

export default MainChatComponent