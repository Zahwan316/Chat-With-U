import dataChat from "../../data/chat"
import useChatStore from "../../state/dummychat"
import BubbleChatComponent from "./component/bubblechat"

const MainChatComponent = () => {
  const chatdata = useChatStore((state) => state.chat)


  return(
    <div className='w-full h-5/6 p-4  overflow-y-auto relative'>
     
        {
            chatdata.map((item) => 
                <BubbleChatComponent
                    id={item.id}
                    body={item.body}
                    sentBy={item.sentBy}
                    time={item.time}
                    type={item.type}
                    file={item.file}
                />
              )
        }
      
    
    </div>
  )
}

export default MainChatComponent