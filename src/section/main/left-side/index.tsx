import { AnimatePresence } from "framer-motion"
import useComponentStore from "../../../state/component"
import ContactComponent from "./Contact"
import ProfileLeftSideComponent from "./Profile"
import StatusMenuComponent from "./Status"

const MainLeftSideComponent = () => {
  const statusMenuActive = useComponentStore((state) => state.statusMenuActive)

  return (
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