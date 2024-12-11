import { AnimatePresence } from "framer-motion"
import useChatStore from "../../../state/chat"
import useComponentStore from "../../../state/component"
import WelcomeChat from "../../../Component/Welcome"
import ProfileMainComponent from "./component/Profile"
import InputComponent from "./Input"
import MainChatComponent from "./MainChat"
import ProfileChatComponent from "./Profile"
import { useEffect, useState } from "react"
import StatusComponent from "./component/Status"
import useUserStore from "../../../state/user"

enum currMenu {
  profile = "profile",
  chat = "chat",
  welcome = 'welcome',
  status = 'status'
}

const MiddleSideComponent = () => {
  const sessionChat = useChatStore((state) => state.sessionChat)
  const profileMenuActive = useComponentStore((state) => state.profileMenuActive)
  const statusMenuActive = useComponentStore((state) => state.statusMenuActive)
  const [currmenu, setcurrmenu] = useState<string>(currMenu.welcome)
  const userInfo = useUserStore((state) => state.userinfo)

  useEffect(() => {
    if (profileMenuActive) setcurrmenu(currMenu.profile);
    else if (statusMenuActive) setcurrmenu(currMenu.status);
    else if (sessionChat === "" || sessionChat === userInfo.id) setcurrmenu(currMenu.welcome)
    else if (sessionChat !== "") setcurrmenu(currMenu.chat)
  }, [profileMenuActive, sessionChat, statusMenuActive])

  const mainChatComponent = (
    <div>
      <ProfileChatComponent />
      <MainChatComponent />
      <InputComponent />
    </div>
  )


  useEffect(() => {

  })

  return (
    <div className='w-full h-full'>
      <AnimatePresence>
        {
          {
            'welcome': <WelcomeChat />,
            'profile': <ProfileMainComponent />,
            'chat': mainChatComponent,
            'status': <StatusComponent />,
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