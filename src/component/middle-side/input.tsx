import { ChangeEvent,  useEffect } from "react"
import useFormStore from "../../state/form"
import Icons from "../icons"
import dataChat from "../../data/chat"
import useChatStore from "../../state/dummychat"

const InputComponent = () => {
  const form = useFormStore((state) => state.form)
  const setform = useFormStore((state) => state.setform)
  const resetform = useFormStore((state) => state.resetform)
  const date = new Date()
  const sendChat = useChatStore((state) => state.addChat)
  const chat = useChatStore((state) => state.chat)

  const handleForm = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setform(name,value)
  }
  

  type chatStructure = {
    id: number,
    type: "text" | "file",
    body: string,
    time: string,
    sentBy: "me" | "other",
    file?:string
  }

  const senderData: chatStructure = {
    id:Math.floor(Math.random() * 99999),
    type:"text",
    body:form?.textchat,
    time:`${date.getHours()}:${date.getMinutes().toString().length == 1 ? "0" : ""}${date.getMinutes()}`,
    sentBy:"me",
  }

  const handleSendForm = () => {
    sendChat(senderData)
    resetform()
  }

  useEffect(() => {
    console.log(form)
    console.log(chat) 
  })

  return(
    <div className='border-t border-white p-4 flex items-center h-20 gap-4'>
        <div className="cursor-pointer">
            <Icons.plusIcon fontsize="35"/>
        </div>
        <div className='w-11/12 h-12'>
            <input type='text' onChange={handleForm} className='bg-[#5356FF37] h-full w-full rounded-xl px-2 hover:border-blue-300 focus:border-blue-400 border border-blue-400 shadow appearance-none focus:outline-none placeholder:text-gray-300 placeholder:text-opacity-60 text-white' placeholder="Type your text" name='textchat' value={form.textchat} />
        </div>
        <div className='cursor-pointer' onClick={handleSendForm}>
            {
                form?.textchat.length != 0 &&
                <Icons.sendIcon fontsize="35"/>

            }
        </div>
    </div>
  )
}

export default InputComponent