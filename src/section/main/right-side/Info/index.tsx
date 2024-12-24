import Icons from "../../../../component/icons";
import useChatStore from "../../../../state/chat";
import useComponentStore from "../../../../state/component"
import useUserStore from "../../../../state/user";
import MediaComponent from "../Media"
import { motion } from 'framer-motion';


const InfoComponent = () => {
  const setInfoMenuActive = useComponentStore((state) => state.setInfoMenuActive)
  const sessionChat = useChatStore((state) => state.sessionChat)
  const allUser = useUserStore((state) => state.alluser)
  const targetUser = allUser?.find((item) => item?.id === sessionChat)

  const handleInfoMenuActive = () => {
    setInfoMenuActive()
  }


  return (
    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "50%", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="w-2/4 border-l flex flex-col items-center border-white">
      <div className='h-16 flex items-center w-full px-4 mb-8 justify-between'>
        <div className="cursor-pointer relative" onClick={handleInfoMenuActive}>
          <Icons.CloseIcon fontsize="20" />
        </div>
        <h2 className='font-bold text-xl'>Info</h2>
        <div></div>
      </div>
      <div className='w-full flex items-center justify-center flex-col text-center mb-6'>
        <div className="mb-6">
          <img src={targetUser?.image === "/" ? "./img/profile.png" : targetUser?.image} className="rounded-full w-52" />
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-2'>{targetUser?.username}</h2>
          <p className='text-lg'>{targetUser?.email}</p>
          <p>{targetUser?.bio === null ? "User ini belum membuat bio" : targetUser?.bio}</p>
        </div>

      </div>
      <MediaComponent />

    </motion.div>
  )
}

export default InfoComponent