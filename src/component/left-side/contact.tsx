import { useEffect } from "react"
import useChatStore from "../../state/chat"
import useUserStore from "../../state/user"

type Data = {
    body: string;
    created_Date?: string;
    group_id?: string | null;
    id: string | number;
    soft_delete?: string | null;
    time: string;
    type: string;
    user_from_id: string;
    user_target_id?: string | null;
    sentBy?: string;
  };

const ContactComponent = () => {
  const chat = useChatStore((state) => state.chat)
  const userinfo = useUserStore((state) => state.userinfo)
  const setSessionChat = useChatStore((state) => state.setSessionChat)
  const SessionChat = useChatStore((state) => state.sessionChat)
  const chatDateSort = chat.sort((a,b) => {
    const dateA = new Date(a.created_Date || "").getTime()
    const dateB = new Date(b.created_Date || "").getTime()
    return dateA - dateB
  })

  const userWhoChat: Array<Data> = chatDateSort.filter((item,index,self) => index === self.findIndex((t) => t.user_from_id === item.user_from_id))

  const handleSessionChat = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const id = target.attributes.getNamedItem("data-id")?.value 
    setSessionChat(id as string)
  }

  useEffect(() => {
    console.log(userWhoChat,SessionChat)
  })

  return(
    <div className='w-full'>
        {
            userWhoChat.map((item: Data) => 
                item?.user_from_id != userinfo?.id &&
                <div className='w-full h-20 p-2 flex flex-row relative top-5  rounded-xl mb-2 hover:bg-[#5356FF] cursor-pointer transition-all' data-id={item.user_from_id} onClick={handleSessionChat}>
                    <div className='w-18 mx-2' data-id={item.user_from_id}>
                        <img src={""} className='w-full h-full rounded-full' data-id={item.user_from_id}/>
                    </div>
                    <div className='w-2/3' data-id={item.user_from_id}>
                        <h2 data-id={item.user_from_id} className ='font-bold text-xl mb-2'>{"Lorem"}</h2>
                        <p data-id={item.user_from_id}  className="line-clamp-1">{item.body}</p>
                    </div>
                    <div className="flex flex-col justify-evenly" data-id={item.user_from_id}>
                        <span data-id={item.user_from_id} className='z-0'>{item.time}</span>
                        <span data-id={item.user_from_id} className="rounded-full bg-blue-500 min-w-6 w-auto flex justify-center items-center">{"999"}</span>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ContactComponent