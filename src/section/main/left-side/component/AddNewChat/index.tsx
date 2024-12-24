import Icons from "../../../../../component/icons"


type props = {
  set: () => void
}

const AddNewChatButton = ({ set }: props) => {
  return (
    <div className="rounded-full w-12 h-12 p-2 right-4 z-10 bottom-3 absolute bg-[#5356FF] cursor-pointer hover:bg-[#4345c7] transition-all" onClick={set}>
      <Icons.plusIcon />
    </div>
  )
}

export default AddNewChatButton