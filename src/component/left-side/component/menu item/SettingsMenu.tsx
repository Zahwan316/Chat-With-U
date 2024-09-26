import React, { useState, MouseEventHandler,  useEffect } from 'react';
import Icons from "../../../icons"
import {motion} from "framer-motion"

type menulist = {
    title: string,
    icon: () => JSX.Element ,
    onClick: MouseEventHandler
}

const MenuList: Array<menulist> = [
    {
        title: "Profile",
        icon:Icons.ProfileIcon ,
        onClick:() => {}
    },
    {
        title: "Settings",
        icon:Icons.GearIcon,
        onClick:() => {}
    },
    {
        title: "Logout",
        icon:Icons.LogoutIcon ,
        onClick:() => {}
    },
]

const SettingsMenuComponent = () => {
  const [active,setActive] = useState<boolean>(false)  

  const handleMenu = () => {
    setActive(!active)
  }

  useEffect(() => {
    console.log(active)
  })

  return(
    <div className="relative">
        <div className="w-10 cursor-pointer relative " onClick={handleMenu}>
            <Icons.AllMenuIcon  />
        </div>
        {
            active &&
            <motion.div animate={{opacity: active? 1 : 0}} initial={{opacity:0}} exit={{opacity:0}}>
                <div className='absolute top-10 rounded-xl w-48 min-h-32 h-auto px-2 py-1  bg-white bg-opacity-15 backdrop-blur-sm z-10'>
                    {
                        MenuList.map((item,index) => 
                            <>
                                <div className='w-full h-10 flex items-center flex-row cursor-pointer '>
                                    <div className='mx-2'>
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
    </div>
  )
}

export default SettingsMenuComponent