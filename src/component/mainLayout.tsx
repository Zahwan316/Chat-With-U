import MainLeftSideComponent from "./left-side"
import MiddleSideComponent from "./middle-side"

const MainLayout = () => {
  return(
    <div className='flex flex-row h-full'>
        <MainLeftSideComponent />
        <MiddleSideComponent />
    </div>
  )
}

export default MainLayout