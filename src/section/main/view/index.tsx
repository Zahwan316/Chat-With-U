import { AnimatePresence } from "framer-motion"
import MainLayout from "../../../Component/mainLayout"
import MediaMenuMainComponent from "../right-side/MediaApp"
import useComponentStore from "../../../state/component"
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserStore from "../../../state/user";
import axios from "axios";
import useChatStore from "../../../state/chat";
import LoadingComponent from "../../../Component/Loading";
import NewChatComponent from "../../../Component/Modal/NewChat";
import getChat from "../../../services/getChat";
import StatusFloatingComponent from "../../../Component/Modal/Status";
import AddStatusFloatingWindowComponent from "../../../Component/Modal/AddStatus";
import { io } from "socket.io-client";
import getGroup from "../../../services/getGroup";
import useGroupStore from "../../../state/group";

const socket = io(import.meta.env.VITE_APP_URL)
const MainChat = memo(() => {
  //chat state
  const addChat = useChatStore((state) => state.addChat)
  const chat = useChatStore((state) => state.chat)

  //grup state
  const group = useGroupStore((state) => state.memberGroup)
  const allGroup = useGroupStore((state) => state.allGroup)
  const addGroup = useGroupStore((state) => state.setMemberGroup)
  const setAllGroup = useGroupStore((state) => state.setAllGroup)

  //user state
  const userInfo = useUserStore((state) => state.userinfo)
  const setuserinfo = useUserStore((state) => state.setuserinfo)
  const setAllUser = useUserStore((state) => state.setalluser)
  const allUser = useUserStore((state) => state.alluser)
  const setUserOnline = useUserStore((state) => state.setUserOnline)

  //component state
  const [loading, setloading] = useState<boolean>(false)
  const hoverMenuActive = useComponentStore((state) => state.hoverMenuActive)
  const newChatMenuActive = useComponentStore((state) => state.newChatMenuActive)
  const statusModalActive = useComponentStore((state) => state.statusModalActive)
  const addStatusModalActive = useComponentStore((state) => state.addStatusModalActive)

  const navigate = useNavigate()

  const token = Cookies.get("token") as string
  const location = useLocation()

  //get this user current chat
  useEffect(() => {
    const getData = async () => {
      try {
        getChat({ userInfo, chat, addChat, token })
        getGroup({ group, userInfo, addGroup, token })
      }
      catch (e) {
        if (import.meta.env.VITE_APP_STAGE === "BUILD") {
          console.log(e)
        }
      }
    }

    if (userInfo && token != undefined) {
      getData()
    }
  }, [userInfo, token])

  //get current user data
  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          setloading(true)
          const res = await axios.get(`${import.meta.env.VITE_APP_URL}auth/user`, {
            "headers": {
              "Authorization": `Bearer ${token}`
            }
          })

          if (allUser.length === 0 || Object.keys(allUser).length === 0) {
            const resUser = await axios.get(`${import.meta.env.VITE_APP_URL}api/user`, {
              "headers": {
                "Authorization": `Bearer ${token}`
              }
            })
            const datauser = resUser.data.data
            setAllUser(datauser)
          }

          if (allGroup.length === 0 || Object.keys(allGroup).length === 0) {
            const resGroup = await axios.get(`${import.meta.env.VITE_APP_URL}api/group`, {
              "headers": {
                "Authorization": `Bearer ${token}`
              }
            })
            const dataGroup = resGroup.data.data
            setAllGroup(dataGroup)
          }

          const data = res.data.data
          setuserinfo(data)

        }
        catch (e) {
          if (import.meta.env.VITE_APP_STAGE === "BUILD") {
            console.log(e)
          }
          setloading(false)
        }
        finally {
          setTimeout(() => {
            setloading(false)
          }, 1000);
        }
      }
      getData()
    }

    if (!token && location.pathname != "login") {
      navigate("/login")
    }

  }, [token])

  //
  useEffect(() => {
    socket.emit('online', userInfo?.id)
    socket.on("getUser", (user) => {
      setUserOnline(user)
    })
  }, [userInfo])

  useEffect(() => {

  })

  return (
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

        {
          statusModalActive &&
          <StatusFloatingComponent />
        }

        {
          addStatusModalActive &&
          <AddStatusFloatingWindowComponent />
        }
      </AnimatePresence>
    </div>
  )
})

export default MainChat