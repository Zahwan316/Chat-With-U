import { memo, MouseEventHandler, useEffect } from "react";
import useChatStore from "../../../../state/chat";

type props = {
    body: string;
    group_id?: string | null;
    id: string | number;
    time: string;
    type: string;
    user_from_id: string;
    user_target_id?: string | null;
    sentBy?: string;
    onClick: MouseEventHandler<HTMLDivElement>,
    username: string,
    img: string,
};

const ContactItemComponent = memo((props: props) => {
  /* const unreadChat = useChatStore((state) => state.unreadChat)
  //const searchChatByFromId = unreadChat.filter((item) => item.user_from_id === props.user_from_id)

  useEffect(() => {
    console.log(unreadChat)
  }) */

  return(
    <div className='w-full h-20 p-2 flex flex-row relative top-5  rounded-xl mb-2 hover:bg-[#5356FF] cursor-pointer transition-all' data-id={props.user_from_id} data-user-target-id={props.user_target_id} onClick={props.onClick}>
      <div className='w-18 mx-2' data-id={props.user_from_id} data-user-target-id={props.user_target_id}>
          <img src={props.img} className='w-full h-full rounded-full' data-id={props.user_from_id} data-user-target-id={props.user_target_id}/>
      </div>
      <div className='w-2/3' data-id={props.user_from_id} data-user-target-id={props.user_target_id}>
          <h2 data-id={props.user_from_id} data-user-target-id={props.user_target_id} className ='font-bold text-xl mb-2'>{props.username}</h2>
          <p data-id={props.user_from_id} data-user-target-id={props.user_target_id}  className="line-clamp-1">{props.body}</p>
      </div>
      <div className="flex flex-col " data-id={props.user_from_id}>
          <span data-id={props.user_from_id} data-user-target-id={props.user_target_id} className='z-0 top-1 relative'>{props.time}</span>
          <span data-id={props.user_from_id} data-user-target-id={props.user_target_id} className={`rounded-full bg-blue-500 min-w-6 w-auto flex justify-center items-center `}>{}</span>
      </div>
    </div>
  )
})

export default ContactItemComponent