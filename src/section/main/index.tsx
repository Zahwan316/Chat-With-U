import { AnimatePresence } from "framer-motion"
import MainLayout from "../../component/mainLayout"
import MediaMenuMainComponent from "../../component/right-side/component/mediaApp"
import useComponentStore from "../../state/component"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserStore from "../../state/user";
import axios from "axios";
import useChatStore from "../../state/chat";

type expectedResponseChat = {
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

const MainChat = () => {
  const hoverMenuActive = useComponentStore((state) => state.hoverMenuActive)
  const addChat = useChatStore((state) => state.addChat)
  const chat = useChatStore((state) => state.chat)
  const userInfo = useUserStore((state) => state.userinfo)

  const navigate = useNavigate()
  const setuserinfo = useUserStore((state) => state.setuserinfo)
 
  const token = Cookies.get("token")
  const location = useLocation()


  useEffect(() => {
    if(token){
      const getData = async() => {
        try{
          const res = await axios.get(`${import.meta.env.VITE_APP_URL}auth/user`,{
            "headers":{
              "Authorization":`Bearer ${token}`
            }
          })

          if(chat.length === 0){
            const resChat = await axios.get(`${import.meta.env.VITE_APP_URL}message?userfromID=${userInfo.id}&usertargetID${userInfo.id}`)
            const dataChat = resChat.data.data
            for(const key in dataChat){
              addChat(dataChat[key])
            }
            console.log(dataChat)
          }

          const data = res.data.data
          setuserinfo(data)
        }
        catch(e){
          console.log(e)
        }
      }
      getData()
    }

    if(!token && location.pathname != "login"){
      navigate("/login")
    }
    
  },[])


  return(
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className={`rounded-xl border border-white w-[95vw] ${hoverMenuActive && "blur-sm"} h-[90vh] bg-slate-50 bg-opacity-5 backdrop-blur-lg`}>
            <MainLayout />
        </div>
        
        <AnimatePresence>
        {
          hoverMenuActive &&
            <MediaMenuMainComponent />
        }
        </AnimatePresence>
    </div>
  )
}

export default MainChat