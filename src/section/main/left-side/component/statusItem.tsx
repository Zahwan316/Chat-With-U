import useComponentStore from "../../../../state/component"
import status from "../../../../types/status"

const StatusItemComponent = (props: status) => {
  const setStatusModalActive = useComponentStore((state) => state.setStatusModalActive)

  return(
    <div className="w-full flex flex-row p-2 px-4 mb-2 rounded-xl hover:bg-[#5356FF] cursor-pointer transition-all" onClick={setStatusModalActive}>
        <div className="w-16 mr-2">
            <img src={props.img} className="w-16 h-16"/>
        </div>
        <div>
            <h2 className="font-bold text-lg mb-1">{props.username}</h2>
            <p>{props.time}</p>
        </div>
    </div>
  )
}

export default StatusItemComponent