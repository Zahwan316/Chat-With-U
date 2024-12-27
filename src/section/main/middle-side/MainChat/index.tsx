import { memo, useEffect, useState } from 'react';
import useChatStore from '../../../../state/chat';
import BubbleChatComponent from '../component/Bubblechat';
import { io } from 'socket.io-client';
import useUserStore from '../../../../state/user';
import chat from '../../../../types/chat';

const socketio = io(import.meta.env.VITE_APP_URL);
const MainChatComponent = memo(() => {
  //chat state
  const chatdata = useChatStore((state) => state.chat);
  const addchat = useChatStore((state) => state.addChat);
  const SessionChat = useChatStore((state) => state.sessionChat);
  const [chatfilter, setchatfilter] = useState<Array<chat>>();
  const setUnreadChat = useChatStore((state) => state.setunreadchat);
  const isGroup = useChatStore((state) => state.isGroup);

  //user state
  const userinfo = useUserStore((state) => state.userinfo);

  //get chat every user send
  useEffect(() => {
    socketio.on('message', (message) => {
      addchat(message);
      setUnreadChat([message]);
    });
  }, [addchat, setUnreadChat]);

  //filter chat every user send
  useEffect(() => {
    const filtered: chat = chatdata.filter((item) => {
      if (isGroup) {
        return item.group_id === SessionChat;
      } else {
        return (
          item?.user_from_id === SessionChat ||
          (item?.user_target_id === userinfo?.id &&
            item?.user_from_id === userinfo?.id) ||
          item?.user_target_id === SessionChat
        );
      }
    });
    setchatfilter(filtered);
  }, [chatdata, SessionChat, userinfo]);

  useEffect(() => {
    console.log("'Main chat Component' filtered chat : ",chatfilter);
  });

  return (
    <div
      className={`w-full h-[75vh] p-4 overflow-y-auto relative ${SessionChat === '' && 'hidden'
        }`}
    >
      {chatfilter?.map((item) => (
        <BubbleChatComponent
          key={item.id}
          id={item.id}
          body={item.body}
          sent_by={item.sent_by}
          time={item.time}
          type={item.type}
          file={item.file}
          user_from_id={item.user_from_id}
          user_target_id={item.user_target_id}
          created_Date={item.created_Date}
        />
      ))}
    </div>
  );
});

export default MainChatComponent;
