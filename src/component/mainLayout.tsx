import { AnimatePresence } from "framer-motion"
import useComponentStore from "../state/component"
import MainLeftSideComponent from "../section/main/left-side"
import MiddleSideComponent from "../section/main/middle-side"
import RightSideComponent from "../section/main/right-side"


const MainLayout = () => {
  const InfoMenuActive = useComponentStore((state) => state.infoMenuActive)

  return(
    <div className='flex flex-row h-full relative'>
        <MainLeftSideComponent />
        <MiddleSideComponent />

        <AnimatePresence>
          {
            InfoMenuActive &&
            <RightSideComponent />

          }
        </AnimatePresence>
        
    </div>
  )
}

export default MainLayout