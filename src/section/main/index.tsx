import { AnimatePresence } from "framer-motion"
import MainLayout from "../../component/mainLayout"
import MediaMenuMainComponent from "../../component/right-side/component/mediaApp"
import useComponentStore from "../../state/component"

const MainChat = () => {
  const hoverMenuActive = useComponentStore((state) => state.hoverMenuActive)

  return(
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className={`rounded-xl border border-white w-[95vw] ${hoverMenuActive && "blur-sm"} h-[90vh] bg-slate-50 bg-opacity-5 backdrop-blur-lg`}>
            <MainLayout />
        </div>
        
        <AnimatePresence>
        {
          hoverMenuActive &&
            <MediaMenuMainComponent />
        }
        </AnimatePresence>
    </div>
  )
}

export default MainChat