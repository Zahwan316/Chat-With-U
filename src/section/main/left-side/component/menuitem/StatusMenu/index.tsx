import Icons from "../../../../../../Component/Icons"
import useComponentStore from "../../../../../../state/component"

const StatusMenuComponent = () => {
  const setStatusMenuActive = useComponentStore((state) => state.setStatusMenuActive)


  return (
    <div className="w-10 cursor-pointer" onClick={setStatusMenuActive}>
      <Icons.StatusIcon />
    </div>
  )
}

export default StatusMenuComponent