import { memo, useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion';
import useUserStore from "../../../state/user";

type chatProps = {
    id: string,
    type: "text" | "file",
    body: string,
    time: string,
    user_target_id?: string,
    user_from_id: string
    sentBy: "me" | "other",
    file?:string
}

const BubbleChatComponent = memo((props: chatProps) => {
  const [readmore,setreadmore] = useState<boolean>(false)
  const [elwidth,setelwidth] = useState<number>(0)
  const userinfo = useUserStore((state) => state.userinfo)
  const elref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(elref.current){
        setelwidth(elref.current.offsetWidth)
    }
  },[])

  const handleReadmore = () => {
    setreadmore(!readmore)
  }

  return(
    <div className={`flex ${props.sentBy === "me" || props.user_from_id === userinfo?.id && "justify-end"}`}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className='rounded-xl relative block right-0 bg-[#D9D9D925] min-h-12  min-w-16 w-auto max-w-md mb-4 py-4' ref={elref}>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`px-4 ${elwidth >= 448 && props.type === "text" ? "mr-0" : "mr-12"} ${!readmore ? "line-clamp-6" : "line-clamp-none"}`}>
            {
                props.type === "text" ?
                <p>{props.body}</p>
                :
                <div className='w-full h-full'>
                    <img src={props.file} className="rounded-lg hover:brightness-75 transition-all cursor-pointer"/>
                </div>
            }
            </motion.div>
            {
                props.body?.length > 200 && !readmore? 
                <div className='px-4 text-blue-300 cursor-pointer hover:underline' onClick={handleReadmore}>
                    <p>Read More</p>
                </div>
                :
                ""

            }

            <div className={`h-1 w-auto  relative flex flex-row justify-end`}>
                <span className='relative text-[0.75rem] bottom-0 right-3'>{props.time}</span>
            </div>
        </motion.div>
    </div>
  )
})

export default BubbleChatComponent