import { AnimatePresence } from "framer-motion"
import MainLayout from "../../component/mainLayout"
import MediaMenuMainComponent from "../../component/right-side/component/mediaApp"
import useComponentStore from "../../state/component"
import useCheckTokenHook from '../../hook/checkToken';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserStore from "../../state/user";
import axios from "axios";

const MainChat = () => {
  const hoverMenuActive = useComponentStore((state) => state.hoverMenuActive)

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