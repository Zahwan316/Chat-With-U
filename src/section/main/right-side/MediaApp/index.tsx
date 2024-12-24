import { useState } from "react"
import useComponentStore from "../../../../state/component"
import { AnimatePresence, motion } from "framer-motion"
import FloatingWindowComponent from "../../../../component/Modal"


type menuDesc = {
  id: number,
  name: string,
  title: string
}

const menu: Array<menuDesc> = [
  {
    id: 1,
    name: "image",
    title: "Image"
  },
  {
    id: 2,
    name: "file",
    title: "File"
  },
]

const dummyImgMenu = [
  {
    id: 1,
    img: "./img/Furina.jpeg",
    sent: "2024/2/1"
  },
  {
    id: 2,
    img: "./img/raiden.jpg",
    sent: "2024/2/1"
  },
  {
    id: 3,
    img: "./img/takina.jpg",
    sent: "2024/2/1"
  },
  {
    id: 3,
    img: "./img/takina.jpg",
    sent: "2024/2/1"
  },
]

const MediaMenuMainComponent = () => {
  const [currMenu, setCurrMenu] = useState<string | undefined>("image")
  const setHoverMenu = useComponentStore((state) => state.setHoverMenuActive)

  const handleCurrMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const name = target.attributes.getNamedItem("data-name")?.value
    setCurrMenu(name)
  }

  const handleHoverMenu = () => {
    setHoverMenu()
  }

  return (
    <FloatingWindowComponent
      title="Media"
      onClick={handleHoverMenu}
    >
      <div className='h-full'>
        <div className="mb-6 flex flex-row gap-4">
          {
            menu.map(item =>
              <AnimatePresence>
                <motion.div className={`${currMenu === item.name && "bg-blue-500"} py-2 px-6 rounded-lg cursor-pointer drop-shadow-md`} data-name={item.name} onClick={handleCurrMenu}>
                  <p className="font-medium text-md" data-name={item.name}>{item.title}</p>
                </motion.div>
              </AnimatePresence>
            )
          }
        </div>
        <motion.div initial={{ display: "none" }} animate={{ display: "flex" }} exit={{ display: "none", opacity: "0" }} className='border border-[#FFFFFF40] p-4 bg-[#5356FF] rounded-md w-full h-5/6 flex flex-wrap gap-6'>
          {
            dummyImgMenu.map((item) =>
              <motion.div className='w-36' initial={{ display: "none", opacity: 0, width: 0 }} animate={{ display: "block", opacity: 1, width: 144 }} exit={{ display: "none", opacity: 0, width: 0 }} transition={{ opacity: { duration: .05 } }}>
                <motion.img initial={{ display: "none", opacity: 0 }} animate={{ display: "block", opacity: 1 }} exit={{ display: "none", opacity: 0 }} src={item.img} className='w-full rounded-sm hover:brightness-75 cursor-pointer transition-all' />
              </motion.div>
            )
          }
        </motion.div>
      </div>
    </FloatingWindowComponent>

  )
}

export default MediaMenuMainComponent