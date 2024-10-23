import { AnimatePresence } from "framer-motion"
import useComponentStore from "../../../state/component"
import ContactComponent from "./contact"
import ProfileLeftSideComponent from "./profile"
import StatusMenuComponent from "./status"

const MainLeftSideComponent = () => {
  const statusMenuActive = useComponentStore((state) => state.statusMenuActive)

  return(
    <div className="w-3/12 border-r border-r-white h-full">
        <ProfileLeftSideComponent />
        {
          statusMenuActive ?
          <AnimatePresence>
            <StatusMenuComponent />
          </AnimatePresence>
          :
          <ContactComponent />
        }
    </div>
  )
}

export default MainLeftSideComponent