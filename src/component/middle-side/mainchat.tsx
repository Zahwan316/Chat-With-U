import { useEffect, useState } from "react"
import useChatStore from "../../state/chat"
import BubbleChatComponent from "./component/bubblechat"
import { io } from "socket.io-client"
import useUserStore from "../../state/user"
import axios from "axios"
import Cookies from 'js-cookie';
import dataChat from '../../data/chat';
import chat from "../../types/chat"
import getChat from "../../services/getChat"
import ConsoleDebug from "../../function/debugConsole"


const socketio = io("http://localhost:3000")
const MainChatComponent = () => {
  const chatdata = useChatStore((state) => state.chat)
  const addchat = useChatStore((state) => state.addChat)
  const SessionChat = useChatStore((state) => state.sessionChat)
  const userinfo = useUserStore((state) => state.userinfo)
  const [chatfilter,setchatfilter] = useState<Array<chat>>()
  const token = Cookies.get("token")


  useEffect(() =>{
    socketio.on("message",(message) => {
      addchat(message)
    })
  },[])

  useEffect(() => {
    const filtered: chat = chatdata.filter((item) => 
      (item?.user_from_id === SessionChat || item?.user_target_id === userinfo?.id && item?.user_from_id === userinfo?.id || item?.user_target_id === SessionChat) 
    )
    setchatfilter(filtered)
  },[chatdata,SessionChat,userinfo])
 

  //get All chat from this user

  /* useEffect(() => {
    const getData = async() => {
      try{  
        getChat({userinfo,chatdata,addchat})
      }
      catch(e){
        if(import.meta.env.VITE_APP_STAGE === "BUILD"){
          console.log(e)
        }
      }
    }
    if(token && userinfo){
      getData()
      
    }
  },[userinfo]) */

  useEffect(() => {
   // ConsoleDebug(userinfo)
  })

  return(
    <div className={`w-full h-[75vh] p-4 overflow-y-auto relative ${SessionChat === "" && "hidden"}`}>
        {
            chatfilter?.map((item) =>            
                <BubbleChatComponent
                    key={item.id}
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