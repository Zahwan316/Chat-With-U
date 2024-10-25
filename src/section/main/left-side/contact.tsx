import { useEffect, useState } from "react"
import useChatStore from "../../../state/chat"
import useUserStore from "../../../state/user"
import ContactItemComponent from "./component/contactitem";
import AddContactButton from "./component/addNewChat";
import contactData from "../../../types/contactData";
import ConsoleDebug from "../../../function/debugConsole";
import useComponentStore from "../../../state/component";

const ContactComponent = () => {
  //user state
  const userinfo = useUserStore((state) => state.userinfo)
  const allUser = useUserStore((state) => state.alluser)

  //chat state
  const chat = useChatStore((state) => state.chat)
  const setSessionChat = useChatStore((state) => state.setSessionChat)
  const SessionChat = useChatStore((state) => state.sessionChat)
  const [filteredChat,setfilteredChat] = useState<Array<contactData>>([])

  //component state
  const setNewChatActive = useComponentStore((state) => state.setNewChatMenuActive)
  
  useEffect(() => {
    //sort date from older chat
    const chatDateSort = chat.sort((a,b) => {
      const dateA = new Date(a.created_Date || "").getTime()
      const dateB = new Date(b.created_Date || "").getTime()
      return dateB - dateA
    })

    //find chat and set chat only 1 newest per user who chat this user
     const uniqueChat = chatDateSort.filter((item, index, self) => 
      index === self.findIndex((t) => (
        (t.user_from_id === item.user_from_id && t.user_target_id === item.user_target_id) ||
        (t.user_from_id === item.user_target_id && t.user_target_id === item.user_from_id)
      ))
    );

   /* const userWhoChat: Array<Data> = uniqueChat.filter(
      (item) => item.user_from_id !== userinfo.id || item.user_target_id === userinfo.id
    ); */

    console.log("unique chat :",uniqueChat)

    setfilteredChat(uniqueChat)
  },[chat])

  //handle session chat when user click the chat user box 
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
            filteredChat.map((item: contactData) => 
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
        <AddContactButton
          set={setNewChatActive}
        />
    </div>
  )
}

export default ContactComponent