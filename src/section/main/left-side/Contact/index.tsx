import { useEffect, useState } from "react"
import useChatStore from "../../../../state/chat"
import useUserStore from "../../../../state/user"
import ContactItemComponent from "../component/Contact Item";
import AddContactButton from "../component/AddNewChat";
import contactData from "../../../../types/contactData";
import useComponentStore from "../../../../state/component";
import { motion } from 'framer-motion';
import useGroupStore from "../../../../state/group";
import GroupItemComponent from "../component/Group Item";

const ContactComponent = () => {
  //group state
  const memberGroup = useGroupStore((state) => state.memberGroup)
  const allGroup = useGroupStore((state) => state.allGroup)

  //user state
  const userinfo = useUserStore((state) => state.userinfo)
  const allUser = useUserStore((state) => state.alluser)

  //chat state
  const chat = useChatStore((state) => state.chat)
  const setSessionChat = useChatStore((state) => state.setSessionChat)
  const setIsGroup = useChatStore((state) => state.setIsGroup)
  const [filteredChat, setfilteredChat] = useState<Array<contactData>>([])

  //component state
  const setNewChatActive = useComponentStore((state) => state.setNewChatMenuActive)

  useEffect(() => {
    //sort date from older chat
    const chatDateSort = chat.sort((a, b) => {
      const dateA = new Date(a.created_Date || "").getTime()
      const dateB = new Date(b.created_Date || "").getTime()
      return dateA - dateB
    })

    //find chat and set chat only 1 newest per user who chat this user
    const uniqueChat = chatDateSort.filter((item, index, self) =>
      index === self.findIndex((t) => (
        (t.user_from_id === item.user_from_id && t.user_target_id === item.user_target_id && item.group_id === null) ||
        (t.user_from_id === item.user_target_id && t.user_target_id === item.user_from_id && item.group_id === null)
      ))
    );
    setfilteredChat(uniqueChat)
  }, [chat])

  //handle session chat when user click the chat user box 
  const handleSessionChat = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const id = target.attributes.getNamedItem("data-id")?.value
    const target_id = target.attributes.getNamedItem("data-user-target-id")?.value
    setSessionChat(id === userinfo.id ? target_id as string : id as string)
    setIsGroup(false)
  }

  const handleSessionChatGroup = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const id = target.attributes.getNamedItem("data-id")?.value
    setSessionChat(id as string)
    setIsGroup(true)
  }

  useEffect(() => {

  })

  return (
    <motion.div initial={{ top: "30px", opacity: 0 }} animate={{ top: "0px", opacity: 1 }} exit={{ top: "30px", opacity: 0 }} className='w-full h-[83vh] relative'>
      {
        memberGroup.map((item) =>
          allGroup.map((items) =>
            items.id === item.Group_id &&
            <GroupItemComponent
              body="test"
              id={items.id}
              img={items.img}
              name={items.name}
              onClick={handleSessionChatGroup}
              time=""
              key={items.id}
            />
          )
        )
      }

      {
        filteredChat.map((item: contactData) =>
          allUser.map((items) => {
            if (item?.user_from_id != userinfo.id) {
              if (item?.user_from_id === items?.id) {
                return (
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
            else if (item?.user_target_id != userinfo.id) {
              if (item?.user_target_id === items?.id) {
                return (
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
    </motion.div>
  )
}

export default ContactComponent