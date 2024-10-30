import { memo, useEffect } from "react"
import useComponentStore from "../../../../state/component"
import status from "../../../../types/status"
import statusContact from "../../../../types/statusContact"
import useChatStore from "../../../../state/chat"

const StatusItemComponent = memo((props: statusContact):JSX.Element => {
  const setStatusModalActive = useComponentStore((state) => state.setStatusModalActive)
  const setSessionChat = useChatStore((state) => state.setSessionChat)

  const handleClick = () => {
    setSessionChat(props.id)
    setStatusModalActive()
  }

  return(
    <div className="w-full flex flex-row p-2 px-4 mb-2 rounded-xl hover:bg-[#5356FF] cursor-pointer transition-all" onClick={handleClick}>
        <div className="w-16 mr-2">
            <img src={props.img} className="w-16 h-16"/>
        </div>
        <div>
            <h2 className="font-bold text-lg mb-1">{props.username}</h2>
            <p>{props.time}</p>
        </div>
    </div>
  )
})

export default StatusItemComponent