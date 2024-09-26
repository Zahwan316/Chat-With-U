import MenuProfileComponent from "./component/menu"

const ProfileLeftSideComponent = () => {
  return(
    <div className='w-full h-16 border-b border-white py-2 px-4 flex items-center flex-row'>
        <div className='w-32 flex flex-row items-center gap-2 '>
            <div className='w-12'>
                <img src='./img/Furina.jpeg' className='rounded-full w-full h-full' />
            </div>
            <p className='text-xl font-bold'>Furina</p>
        </div>
        
        <MenuProfileComponent />
        
    </div>
  )
}

export default ProfileLeftSideComponent