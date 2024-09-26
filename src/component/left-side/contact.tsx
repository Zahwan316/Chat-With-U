import dataContact from "../../data/contact"

const ContactComponent = () => {
  return(
    <div className='w-full'>
        {
            dataContact.map((item) => 
                <div className='w-full h-20 p-2 flex flex-row relative top-5  rounded-xl mb-2 hover:bg-[#5356FF] cursor-pointer transition-all'>
                    <div className='w-18 mx-2'>
                        <img src={item.profile} className='w-full h-full rounded-full' />
                    </div>
                    <div className='w-2/3'>
                        <h2 className='font-bold text-xl mb-2'>{item.name}</h2>
                        <p>{item.lastChat}</p>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <span className='z-0'>{item.time}</span>
                        <span className="rounded-full bg-blue-500 min-w-6 w-auto flex justify-center items-center">{item.unreadMessage}</span>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ContactComponent