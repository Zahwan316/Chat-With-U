import ContactComponent from "./contact"
import ProfileLeftSideComponent from "./profile"

const MainLeftSideComponent = () => {
  return(
    <div className="w-3/12 border-r border-r-white h-full">
        <ProfileLeftSideComponent />
        <ContactComponent />
    </div>
  )
}

export default MainLeftSideComponent