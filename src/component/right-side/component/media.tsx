import Icons from "../../icons"

const MediaComponent = () => {
  return(
    <div className='w-full px-8 py-2 h-72'>
      <div className='w-full h-full bg-[#D9D9D925] p-5 rounded-lg'> 
        <div className='mb-4 flex justify-between items-center'>
            <p className='font-bold'>Media</p>
            <div className="cursor-pointer">
                <Icons.RightArrow />
            </div>
        </div>
        <div className='flex gap-8'>
          <img src='./img/Furina.jpeg' className='rounded-md w-44' />
          <img src='./img/raiden.jpg' className='rounded-md w-44' />
        </div>
      </div>
    </div>
  )
}

export default MediaComponent