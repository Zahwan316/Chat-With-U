import useComponentStore from "../../../../state/component"
import Icons from "../../../../Component/Icons"
import { motion } from 'framer-motion';

const MediaComponent = () => {
  const setHoverMenu = useComponentStore((state) => state.setHoverMenuActive)

  const handleHoverMenu = () => {
    setHoverMenu()
  }

  return (
    <div className='w-full px-8 py-2 h-72'>
      <div className='w-full h-full bg-[#D9D9D925] p-5 rounded-lg'>
        <div className='mb-4 flex justify-between items-center'>
          <p className='font-bold'>Media</p>
          <div className="cursor-pointer" onClick={handleHoverMenu}>
            <Icons.RightArrow />
          </div>
        </div>
        <motion.div initial={{ width: 0 }} animate={{ width: 176 }} exit={{ width: 0 }} className='flex gap-8'>
          <img src='./img/Furina.jpeg' className='rounded-md w-44' />
          <img src='./img/raiden.jpg' className='rounded-md w-44' />
        </motion.div>
      </div>
    </div>
  )
}

export default MediaComponent