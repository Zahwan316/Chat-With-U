import useComponentStore from "../../../state/component"
import Icons from "../../icons"

const AddNewChatButton = () => {
  const handleNewChatActive = useComponentStore((state) => state.setNewChatMenuActive)
  return(
    <div className="rounded-full w-12 h-12 p-2 right-4 z-10 bottom-3 absolute bg-[#5356FF] cursor-pointer hover:bg-[#4345c7] transition-all" onClick={handleNewChatActive}>
      <Icons.plusIcon />
    </div>
  )
}

export default AddNewChatButton