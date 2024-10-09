import { ChangeEvent,  useEffect, useRef } from "react"
import useFormStore from "../../state/form"
import Icons from "../icons"
import useChatStore from "../../state/chat"
import io from "socket.io-client"
import useUserStore from "../../state/user"
import {v4 as uuidv4} from "uuid"

const socket = io("http://localhost:3000")
const InputComponent = () => {
  const form = useFormStore((state) => state.form)
  const setform = useFormStore((state) => state.setform)
  const resetform = useFormStore((state) => state.resetform)
  const date = new Date()
  const chat = useChatStore((state) => state.chat)
  const inputref = useRef<HTMLInputElement>(null)
  const userinfo = useUserStore((state) => state.userinfo)
  const sessionChat = useChatStore((state) => state.sessionChat)

  const sendMsg = () => {   
    
    socket.emit("message",senderData)
    resetform()  
  }

  const handleForm = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setform(name,value)
  }


  type chatStructure = {
    id: string,
    type: "text" | "file",
    body: string,
    time: string,
    user_target_id: string,
    user_from_id: string
    sentBy?: "me" | "other",
    created_Date: string,
    file?:string
  }

  const senderData: chatStructure = {
    id:uuidv4(),
    type:"text",
    body:form?.textchat,
    time:`${date.getHours()}:${date.getMinutes().toString().length == 1 ? "0" : ""}${date.getMinutes()}`,
    //sentBy:"me",
    user_from_id:userinfo?.id,
    user_target_id:sessionChat,
    created_Date:date.toISOString()
  }

  const handleSendForm = () => {
    sendMsg()
  }

  const sendChatWithEnter = () => {
    if(inputref.current){
      inputref.current.addEventListener("keypress",(e) => {
        switch(e.keyCode){
          case 13:
            handleSendForm()
            break;
        }
      })
    }
  }

  useEffect(() => {
    console.log(chat) 
  })

  return(
    <div className={`border-t border-white p-4 flex items-center h-20 gap-4 ${sessionChat === "" && "hidden"}`} >
        <div className="cursor-pointer">
            <Icons.plusIcon fontsize="35"/>
        </div>
        <div className='w-11/12 h-12'>
            <input type='text' ref={inputref} onChange={handleForm} /* onKeyPress={sendChatWithEnter} */ className='bg-[#5356FF37] h-full w-full rounded-xl px-2 hover:border-blue-300 focus:border-blue-400 border border-blue-400 shadow appearance-none focus:outline-none placeholder:text-gray-300 placeholder:text-opacity-60 text-white' placeholder="Type your text" name='textchat' value={form.textchat} />
        </div>
        <div className='cursor-pointer' onClick={handleSendForm}>
            {
                form?.textchat?.length > 0 &&
                <Icons.sendIcon fontsize="35"/>

            }
        </div>
    </div>
  )
}

export default InputComponent