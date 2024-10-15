import axios from "axios"
import chat from "../types/chat"
import user from "../types/user"

type prop = {
    chat: Array<chat>,
    userInfo: user,
    addChat: (chatvalue:chat) => void
}

const getChat = ({chat,userInfo,addChat}: prop) => {
    if(chat.length === 0 && userInfo){
        if(userInfo?.id){
          setTimeout(async() => {
            const resChat = await axios.get(`${import.meta.env.VITE_APP_URL}api/message?userfromID=${userInfo?.id}&usertargetID=${userInfo?.id}`)
            const dataChat = resChat.data.data
            for(const key in dataChat){
              const newChat:chat = dataChat[key]
              if(dataChat[key].user_from_id === userInfo?.id){
                 newChat.sent_by = "me"
                }
                addChat(dataChat[key])
              //console.log(dataChat[key])
            }
          }, 1500);
        }
        
      }
}

export default getChat