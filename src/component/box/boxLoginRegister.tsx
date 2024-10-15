type props = {
  children: React.ReactNode,
  title: string
}

const BoxLoginRegister = ({children,title}: props) => {
  return(
    <div className='flex flex-col'>
      <div className="w-5/6 ">
        <img src='./img/chatwithu.svg' className="w-full h-full"/>
      </div>
      <div className='w-[100%] h-auto  border border-[#ffffff30] rounded-2xl bg-gradient-to-br from-[#ffffff50] to-[#1d4ed820] bg-opacity-15 backdrop-blur-lg py-4 px-6'>
          <div className='w-full h-16 flex justify-center items-center mb-2'>
              <h2 className='font-bold text-xl'>{title}</h2>
          </div>
          {children}
      </div>
    </div>
  )
}

export default BoxLoginRegister