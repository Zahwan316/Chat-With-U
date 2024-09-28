import useComponentStore from "../state/component"
import MainLeftSideComponent from "./left-side"
import MiddleSideComponent from "./middle-side"
import RightSideComponent from "./right-side"

const MainLayout = () => {
  const InfoMenuActive = useComponentStore((state) => state.infoMenuActive)

  return(
    <div className='flex flex-row h-full'>
        <MainLeftSideComponent />
        <MiddleSideComponent />
        {
          InfoMenuActive &&
          <RightSideComponent />

        }
    </div>
  )
}

export default MainLayout