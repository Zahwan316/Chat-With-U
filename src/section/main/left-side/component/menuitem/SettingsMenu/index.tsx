import React, { useState, MouseEventHandler, useEffect } from 'react';

import { AnimatePresence, motion } from "framer-motion"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useChatStore from '../../../../../../state/chat';
import useComponentStore from '../../../../../../state/component';
import { io } from 'socket.io-client';
import Icons from '../../../../../../component/icons';


type menulist = {
  title: string,
  icon: () => JSX.Element,
  onClick: MouseEventHandler
}

const socket = io(import.meta.env.VITE_APP_URL)
const SettingsMenuComponent = () => {
  const [active, setActive] = useState<boolean>(false)
  const setProfileMenuActive = useComponentStore((state) => state.setProfileMenuActive)

  const handleLogout = () => {
    Cookies.remove("token")
    socket.on("disconnect", () => {

    })
    //removeAllChat()
    setTimeout(() => {
      window.location.href = "/login"
      //navigate("/login")
    }, 500)
  }

  const handleProfile = () => {
    setProfileMenuActive()
    setActive(false)
  }

  const MenuList: Array<menulist> = [
    {
      title: "Profile",
      icon: Icons.ProfileIcon,
      onClick: () => { handleProfile() }
    },
    {
      title: "Settings",
      icon: Icons.GearIcon,
      onClick: () => { }
    },
    {
      title: "Logout",
      icon: Icons.LogoutIcon,
      onClick: handleLogout

    },
  ]

  const handleMenu = () => {
    setActive(!active)
  }

  useEffect(() => {
    //console.log(active)
  })

  return (
    <div className="relative">
      <div className="w-10 cursor-pointer relative " onClick={handleMenu}>
        <Icons.AllMenuIcon />
      </div>
      <AnimatePresence>
        {
          active &&
          <motion.div animate={{ opacity: 1, zIndex: 99 }} initial={{ opacity: 0, zIndex: 99 }} exit={{ opacity: 0 }}>
            <div className='absolute top-10 rounded-xl w-48 min-h-32 h-auto px-2 py-1  bg-blue-400 bg-opacity-55 backdrop-blur-lg z-30'>
              {
                MenuList.map((item, index) =>
                  <>
                    <div className='w-full h-10 flex items-center flex-row cursor-pointer ' onClick={item.onClick}>
                      <div className='mx-2' >
                        {item.icon()}
                      </div>
                      <p className='font-bold'>{item.title}</p>
                    </div>
                    {index == MenuList.length - 2 &&
                      <div className='w-full border my-2'>

                      </div>
                    }
                  </>
                )
              }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default SettingsMenuComponent