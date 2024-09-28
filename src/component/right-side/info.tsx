import useComponentStore from "../../state/component"
import Icons from "../icons"
import MediaComponent from "./component/media"

const InfoComponent = () => {
  const setInfoMenuActive = useComponentStore((state) => state.setInfoMenuActive)

  const handleInfoMenuActive = () => {
    setInfoMenuActive()
  }

  return(
    <div className="w-2/4 border-l flex flex-col items-center border-white">
        <div className='h-16 flex items-center w-full px-4 mb-8 justify-between'>
            <div className="cursor-pointer relative" onClick={handleInfoMenuActive}>
                <Icons.CloseIcon fontsize="20"/>
            </div>
            <h2 className='font-bold text-xl'>Info</h2>
            <div></div>
        </div>
        <div className='w-full flex items-center justify-center flex-col text-center mb-6'>
            <div className="mb-6">
                <img src={"./img/raiden.jpg"}  className="rounded-full w-52"/>
            </div>
            <div>
                <h2 className='font-bold text-2xl mb-2'>Raiden</h2>
                <p>Raiden@gmail.com</p>
            </div>

        </div>
        <MediaComponent />
    </div>
  )
}

export default InfoComponent