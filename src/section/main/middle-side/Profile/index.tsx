import { useEffect, useState } from "react"
import useChatStore from "../../../../state/chat"
import useComponentStore from "../../../../state/component"
import useGroupStore from "../../../../state/group"
import useUserStore from "../../../../state/user"

const ProfileChatComponent = () => {
  const setInfoMenuActive = useComponentStore((state) => state.setInfoMenuActive)
  const sessionchat = useChatStore((state) => state.sessionChat)
  const allUser = useUserStore((state) => state.alluser)
  const allGroup = useGroupStore((state) => state.allGroup)
  const userOnline = useUserStore((state) => state.userOnline)
  const isGroup = useChatStore((state) => state.isGroup)

  const targetChatUser = allUser.find((item) => item.id === sessionchat)
  const targetGroupUser = allGroup.find((item) => item.id === sessionchat)
  const [profileImg, setProfileImg] = useState<string>("")

  const handleInfoMenuActive = () => {
    setInfoMenuActive()
  }

  const handleImgCheck = () => {
    if (!isGroup) {
      if (targetChatUser?.image === "/" || targetChatUser?.image === "") {
        return "./img/profile.png"
      }
      else {
        return targetChatUser?.image
      }
    }
    else {
      if (targetGroupUser?.img === "/" || targetGroupUser?.img === "") {
        return "https://www.svgrepo.com/show/286776/users-young.svg"
      }
      else {
        return targetGroupUser?.img
      }
    }
  }


  return (
    <div className={`w-full h-16 border-b flex items-center p-4 cursor-pointer hover:-backdrop-hue-rotate-90 ${sessionchat === "" && "hidden"}`} onClick={handleInfoMenuActive}>
      <div className='w-12 flex items-center mx-2'>
        <img src={handleImgCheck()} className='rounded-full w-full h-full' />
      </div>
      <div>
        <p className="font-bold text-xl">{targetChatUser?.username || targetGroupUser?.name}</p>
        {
          userOnline.map((item) =>
            item.userid === sessionchat &&
            <p className='text-sm'>Online</p>
          )
        }
      </div>
    </div>
  )
}

export default ProfileChatComponent