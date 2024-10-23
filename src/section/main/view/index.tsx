import { AnimatePresence } from "framer-motion"
import MainLayout from "../../../component/mainLayout"
import MediaMenuMainComponent from "../right-side/mediaApp"
import useComponentStore from "../../../state/component"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserStore from "../../../state/user";
import axios from "axios";
import useChatStore from "../../../state/chat";
import LoadingComponent from "../../../component/loading/loading";
import NewChatComponent from "../../../component/floating-window/newchat";
import getChat from "../../../services/getChat";


const MainChat = () => {
  const hoverMenuActive = useComponentStore((state) => state.hoverMenuActive)
  const addChat = useChatStore((state) => state.addChat)
  const chat = useChatStore((state) => state.chat)
  const userInfo = useUserStore((state) => state.userinfo)
  const setuserinfo = useUserStore((state) => state.setuserinfo)
  const setAllUser = useUserStore((state) => state.setalluser)
  const allUser = useUserStore((state) => state.alluser)
  const [loading,setloading] = useState<boolean>(false)
  const newChatMenuActive = useComponentStore((state) => state.newChatMenuActive)

  const navigate = useNavigate()
 
  const token = Cookies.get("token")
  const location = useLocation()

  //get this user current chat
  useEffect(() => {
    const getData = async() => {
      try{  
        getChat({userInfo,chat,addChat})
      }
      catch(e){
        if(import.meta.env.VITE_APP_STAGE === "BUILD"){
          console.log(e)
        }
      }
    }
    if(token && userInfo){
      getData()
      
    }
  },[userInfo,token])


  useEffect(() => {
    if(token){
      const getData = async() => {
        try{
          setloading(true)
          const res = await axios.get(`${import.meta.env.VITE_APP_URL}auth/user`,{
            "headers":{
              "Authorization":`Bearer ${token}`
            }
          })
        
          if(allUser.length === 0){
            const resUser = await axios.get(`${import.meta.env.VITE_APP_URL}api/user`,{
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            })
            const datauser = resUser.data.data
            setAllUser(datauser)
          }

          const data = res.data.data
          setuserinfo(data)
          console.log(userInfo)
        }
        catch(e){
          if(import.meta.env.VITE_APP_STAGE === "BUILD"){
            console.log(e)
          }
          setloading(false)
        }
        finally{
          setTimeout(() => {
            setloading(false)
          }, 1000);
        }
      }
      getData()
    }

    if(!token && location.pathname != "login"){
      navigate("/login")
    }
    
  },[token])

  useEffect(() => {
    
  })


  return(
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className={`rounded-xl border border-white w-[95vw] ${hoverMenuActive && "blur-sm"} h-[90vh] bg-slate-50 bg-opacity-10 backdrop-blur-lg`}>
            <MainLayout />
        </div>
        
        <AnimatePresence>
        {
          hoverMenuActive &&
            <MediaMenuMainComponent />
        }
        {
          loading && 
            <LoadingComponent />
        }
        {
          newChatMenuActive &&
            <NewChatComponent />
        }
        </AnimatePresence>
    </div>
  )
}

export default MainChat