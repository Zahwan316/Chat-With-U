import useUserStore from "../../state/user"
import MenuProfileComponent from "./component/menu"

const ProfileLeftSideComponent = () => {
  const userinfo = useUserStore((state) => state.userinfo)

  return(
    <div className='w-full h-16 border-b border-white py-2 px-4 flex items-center flex-row'>
        <div className='w-32 flex flex-row items-center gap-2 '>
            <div className='w-12'>
                <img src={userinfo?.image === "/" || userinfo?.image === null ? "./img/profile.png" : userinfo?.image} className='rounded-full w-full h-full' />
            </div>
            <p className='text-xl font-bold'>{userinfo?.username}</p>
        </div>
        
        <MenuProfileComponent />
        
    </div>
  )
}

export default ProfileLeftSideComponent