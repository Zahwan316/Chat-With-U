import useChatStore from "../../state/chat"
import useComponentStore from "../../state/component"

const ProfileChatComponent = () => {
  const setInfoMenuActive = useComponentStore((state) => state.setInfoMenuActive)
  const sessionchat = useChatStore((state) => state.sessionChat)

  const handleInfoMenuActive = () => {
    setInfoMenuActive()
  }

  return(
     <div className={`w-full h-16 border-b flex items-center p-4 cursor-pointer hover:-backdrop-hue-rotate-90 ${sessionchat === "" && "hidden"}`} onClick={handleInfoMenuActive}>
        <div className='w-12 flex items-center mx-2'>
            <img src='./img/raiden.jpg' className='rounded-full w-full h-full' />
        </div>
        <div>
            <p className="font-bold text-xl">Raiden</p>
        </div>
     </div>
  )
}

export default ProfileChatComponent