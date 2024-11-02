import axios from "axios"
import chat from "../types/chat"
import user from "../types/user"
import Cookies from 'js-cookie';

type prop = {
    chat: Array<chat>,
    userInfo: user,
    addChat: (chatvalue:chat) => void,
    token: string
}

//const token = Cookies.get("token")

const getChat = ({chat,userInfo,addChat,token}: prop) => {
    if(chat.length === 0 && userInfo){
        if(userInfo?.id){
          setTimeout(async() => {
            const resChat = await axios.get(`${import.meta.env.VITE_APP_URL}api/message?userfromID=${userInfo?.id}&usertargetID=${userInfo?.id}`,{
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            })
            const dataChat = resChat.data.data
            for(const key in dataChat){
              const newChat:chat = dataChat[key]
              if(dataChat[key].user_from_id === userInfo?.id){
                 newChat.sent_by = "me"
                }
                addChat(dataChat[key])
              //console.log(dataChat[key])
            }
          }, 2000);
        }
        
      }
}

export default getChat