import { useEffect, useState } from "react"
import useChatStore from "../../state/chat"
import useUserStore from "../../state/user"
import ContactItemComponent from "./component/contactitem";
import AddContactButton from "./component/addNewChat";

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
  const allUser = useUserStore((state) => state.alluser)
  const [filteredChat,setfilteredChat] = useState<Array<Data>>([])
  
  useEffect(() => {
    const chatDateSort = chat.sort((a,b) => {
      const dateA = new Date(a.created_Date || "").getTime()
      const dateB = new Date(b.created_Date || "").getTime()
      return dateA - dateB
    })

     const uniqueChat = chatDateSort.filter((item, index, self) => 
      index === self.findIndex((t) => (
        (t.user_from_id === item.user_from_id && t.user_target_id === item.user_target_id) ||
        (t.user_from_id === item.user_target_id && t.user_target_id === item.user_from_id)
      ))
    );

   const userWhoChat: Array<Data> = uniqueChat.filter(
      (item) => item.user_from_id !== userinfo.id || item.user_target_id === userinfo.id
    );

    console.log("unique chat :",uniqueChat)

    setfilteredChat(uniqueChat)
  },[chat])

  const handleSessionChat = (e:React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const id = target.attributes.getNamedItem("data-id")?.value 
    const target_id = target.attributes.getNamedItem("data-user-target-id")?.value 
    setSessionChat(id === userinfo.id ? target_id as string: id as string)

  }

  useEffect(() => {
    console.log(filteredChat,SessionChat)
  })

  return(
    <div className='w-full h-[83vh] relative'>
        {
            filteredChat.map((item: Data) => 
              allUser.map((items) => {
                if(item?.user_from_id != userinfo.id){
                  if(item?.user_from_id === items?.id){
                    return(
                      <ContactItemComponent 
                        body={item.body}
                        id={item.id}
                        onClick={handleSessionChat}
                        user_from_id={item.user_from_id}
                        time={item.time}
                        type={item.type}
                        username={items.username}
                        group_id={item.created_Date}
                        key={item.id}
                        sentBy={item.sentBy}
                        user_target_id={item.user_target_id}
                        img={items?.image === "/" ? "./img/profile.png" : items?.image}
                      />
                    )
                  }
                  
                }
                else if(item?.user_target_id != userinfo.id){
                  if(item?.user_target_id === items?.id){
                    return(
                      <ContactItemComponent 
                        body={item.body}
                        id={item.id}
                        onClick={handleSessionChat}
                        user_from_id={item.user_from_id}
                        time={item.time}
                        type={item.type}
                        username={items.username}
                        group_id={item.created_Date}
                        key={item.id}
                        sentBy={item.sentBy}
                        user_target_id={item.user_target_id}
                        img={items?.image === "/" ? "./img/profile.png" : items?.image}
                      />
                    )
                  }
                }
              }
                //item?.user_from_id !== userinfo?.id  &&
              )
            )
        }
        <AddContactButton />
    </div>
  )
}

export default ContactComponent