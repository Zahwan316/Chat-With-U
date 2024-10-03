import { useEffect, useState } from "react"
import useChatStore from "../../state/chat"
import BubbleChatComponent from "./component/bubblechat"
import { io, Socket } from "socket.io-client"

const socketio = io("http://localhost:3000")
const MainChatComponent = () => {
  const chatdata = useChatStore((state) => state.chat)
  const addchat = useChatStore((state) => state.addChat)

  useEffect(() =>{
    socketio.on("message",(message) => {
      addchat(message)
    })
  },[])
 

  return(
    <div className='w-full h-5/6 p-4  overflow-y-auto relative'>
     
        {
            chatdata.map((item) => 
                <BubbleChatComponent
                    id={item.id}
                    body={item.body}
                    sentBy={item.sentBy}
                    time={item.time}
                    type={item.type}
                    file={item.file}
                />
              )
        }
      
    
    </div>
  )
}

export default MainChatComponent