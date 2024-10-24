import { AnimatePresence } from "framer-motion"
import useChatStore from "../../../state/chat"
import useComponentStore from "../../../state/component"
import WelcomeChat from "../../../component/Welcome/welcomeChat"
import ProfileMainComponent from "./component/profil"
import InputComponent from "./input"
import MainChatComponent from "./mainchat"
import ProfileChatComponent from "./profile"
import { useEffect, useState } from "react"
import StatusComponent from "./component/status"

enum currMenu {
  profile="profile",
  chat="chat",
  welcome='welcome',
  status='status'
}

const MiddleSideComponent = () => {
  const sessionChat = useChatStore((state) => state.sessionChat)
  const profileMenuActive = useComponentStore((state) => state.profileMenuActive)
  const statusMenuActive = useComponentStore((state) => state.statusMenuActive)
  const [currmenu,setcurrmenu] = useState<string>(currMenu.welcome)

  useEffect(() => {
    if(profileMenuActive) setcurrmenu(currMenu.profile);
    else if(statusMenuActive) setcurrmenu(currMenu.status);
    else if(sessionChat === "") setcurrmenu(currMenu.welcome)
    else if(sessionChat !== "") setcurrmenu(currMenu.chat)
  },[profileMenuActive,sessionChat,statusMenuActive])

  const mainChatComponent = (
    <div>
      <ProfileChatComponent />
      <MainChatComponent />
      <InputComponent />
    </div>
  )


  useEffect(() => {
    console.log(currmenu,profileMenuActive)
  })

  return(
    <div className='w-full h-full'>
      <AnimatePresence>
        {
          {
            'welcome':<WelcomeChat />,
            'profile':<ProfileMainComponent />,
            'chat':mainChatComponent ,
            'status':<StatusComponent /> ,
          }[currmenu]
        }
      </AnimatePresence>
      
     {/*  <AnimatePresence>
        {
          sessionChat === "" && <WelcomeChat />
        }

        {
          profileMenuActive && <ProfileMainComponent />
          
        }

        {
          sessionChat != "" && mainChatComponent
        }

        {
          statusMenuActive && <StatusComponent />
        }
      </AnimatePresence> */}
        
      {/*  /*  sessionChat === "" ?
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
        ) */ }
            
    </div>
  )
}

export default MiddleSideComponent