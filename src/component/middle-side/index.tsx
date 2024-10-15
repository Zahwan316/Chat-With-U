import useChatStore from "../../state/chat"
import WelcomeChat from "../Welcome/welcomeChat"
import InputComponent from "./input"
import MainChatComponent from "./mainchat"
import ProfileChatComponent from "./profile"

const MiddleSideComponent = () => {
  const sessionChat = useChatStore((state) => state.sessionChat)

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
        mainChatComponent
      }
        
       
    </div>
  )
}

export default MiddleSideComponent