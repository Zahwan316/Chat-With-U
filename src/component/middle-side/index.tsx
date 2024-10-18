import { AnimatePresence } from "framer-motion"
import useChatStore from "../../state/chat"
import useComponentStore from "../../state/component"
import WelcomeChat from "../Welcome/welcomeChat"
import ProfileMainComponent from "./component/profil"
import InputComponent from "./input"
import MainChatComponent from "./mainchat"
import ProfileChatComponent from "./profile"

const MiddleSideComponent = () => {
  const sessionChat = useChatStore((state) => state.sessionChat)
  const profileMenuActive = useComponentStore((state) => state.profileMenuActive)

  const mainChatComponent = (
    <div>
      <ProfileChatComponent />
      <MainChatComponent />
      <InputComponent />
    </div>
  )

  return(
    <div className='w-full h-full'>
      {
        sessionChat === "" ?
        <WelcomeChat />
        :
        (
          profileMenuActive ?
          <AnimatePresence>
            <ProfileMainComponent />
          </AnimatePresence>
          :
          <AnimatePresence>
            {
              mainChatComponent
            }
          </AnimatePresence>
        )
      }       
    </div>
  )
}

export default MiddleSideComponent