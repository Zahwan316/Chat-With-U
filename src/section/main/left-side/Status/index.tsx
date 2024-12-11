import { memo, useEffect } from "react";
import useComponentStore from "../../../../state/component";
import AddNewChatButton from "../component/AddNewChat";
import StatusItemComponent from "../component/StatusItem"
import { AnimatePresence, motion } from 'framer-motion';
import ErrorNotification from "../../../../function/errorSwal";
import axios from "axios";
import Cookies from 'js-cookie';
import useStatusStore from "../../../../state/status";
import status from "../../../../types/status";
import { io } from "socket.io-client";
import useUserStore from "../../../../state/user";
import statusContact from "../../../../types/statusContact";

const socketio = io(import.meta.env.VITE_APP_URL)
const StatusMenuComponent = memo(() => {
  //local state
  const token = Cookies.get("token")
  const date = new Date()

  //users store
  const allUser = useUserStore((state) => state.alluser)
  const userInfo = useUserStore((state) => state.userinfo)

  //status state
  const setStatus = useStatusStore((state) => state.setstatus)
  const addStatus = useStatusStore((state) => state.addstatus)
  const status = useStatusStore((state) => state.status)
  //const [filteredStatus,setFilteredStatus] = useState<Array<status>>([])

  //component state
  const setAddStatusModalActive = useComponentStore((state) => state.setAddStatusModalActive)

  //return title element
  const title = (title: string) => {
    return (
      <div className='p-2 my-2'>
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
    )
  }

  //filter status
  const sortStatusWithDate = status.sort((a, b) => {
    const dateA = new Date(a.created_date || "").getTime()
    const dateB = new Date(b.created_date || "").getTime()
    return dateB - dateA
  })

  //find chat and set chat only 1 newest per user who chat this user
  const uniqueStatus = sortStatusWithDate.reduce((acc: Array<status>, current) => {
    // Cek apakah user_id sudah ada di accumulator
    if (!acc.find(item => item.user_id === current.user_id) && current.user_id !== userInfo?.id) {
      acc.push(current); // Tambahkan status jika belum ada user_id yang sama
    }
    return acc;
  }, []);

  //check if curr user has uploaded status
  const currUserStatus = (): string => {
    const hasStatus = status.filter((item) => item.user_id === userInfo.id)
    if (hasStatus.length === 0) return "Belum ada status"
    return hasStatus[0]?.time
  }

  //get status data
  useEffect(() => {
    socketio.on("status", (statusData) => {
      setStatus(statusData)
    })

    const getdata = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/status`, {
          "headers": {
            "Authorization": `Bearer ${token}`
          }
        })
        const data: status[] = res.data.data
        const activeStatus = data.filter((item) => item.expired_at && date.toISOString() < item.expired_at)
        addStatus(data)
      }
      catch (e) {
        ErrorNotification(e)
      }
    }

    if (Object.keys(status).length === 0) getdata()

  }, [])

  useEffect(() => {
    socketio.on("refresh-status", (statusdata) => {
      addStatus(statusdata)
    })
  }, [addStatus])

  useEffect(() => {
    const currStatus = status.filter((item) => item.expired_at && date.toISOString() > item.expired_at)
    for (const key in currStatus) {
      if (date.toISOString() > currStatus[key].expired_at) {
        socketio.emit("deleteStatus", { id: currStatus[key]?.id, token: Cookies.get("token") })
      }
    }

  }, [date, status])

  return (
    <AnimatePresence>
      <motion.div className="relative h-[82vh]" initial={{ top: "30px", opacity: 0 }} animate={{ top: "0px", opacity: 1 }} exit={{ top: "30px", opacity: 0 }} transition={{ duration: .1, ease: "easeOut" }}>
        {title("Status Saya")}
        <div>
          <StatusItemComponent
            id={userInfo.id}
            img="./img/profile.png"
            time={currUserStatus()}
            username="Status Saya"

          />
        </div>
        {title("Update Terbaru")}
        <div className="">
          {
            uniqueStatus.map((item) =>
              allUser.map((items) =>
                items.id === item.user_id &&
                <StatusItemComponent
                  key={item.user_id}
                  id={item.user_id}
                  img="./img/profile.png"
                  time={item.time}
                  username={items.username}
                />
              )
            )
          }
        </div>
        <AddNewChatButton
          set={setAddStatusModalActive}
        />
      </motion.div>
    </AnimatePresence>
  )
})

export default StatusMenuComponent