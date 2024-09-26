import InputComponent from "./input"
import MainChatComponent from "./mainchat"
import ProfileChatComponent from "./profile"

const MiddleSideComponent = () => {
  return(
    <div className='w-full h-full'>
        <ProfileChatComponent />
        <MainChatComponent />
        <InputComponent />
    </div>
  )
}

export default MiddleSideComponent