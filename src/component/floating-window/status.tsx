import { useEffect, useState } from "react"
import statusDummyData from "../../data/status"
import InputComponent from "../../section/main/middle-side/input"
import useComponentStore from "../../state/component"
import Icons from "../icons"
import FloatingWindowComponent from "./floating"

const StatusFloatingComponent = () => {
  const setStatusModalActive = useComponentStore((state) => state.setStatusModalActive)
  const statusdummydata = statusDummyData
  const [currindex,setcurrindex] = useState<number>(0)

  const handleCurrIndex = (e: React.MouseEvent<HTMLDivElement>) => {
     const target = e.currentTarget as HTMLElement
     const handle = target.attributes.getNamedItem('data-method')?.value
     if(handle == 'previous') setcurrindex((prev) => (prev - 1))
     if(handle == 'next') setcurrindex((prev) => (prev + 1))
  }

  const handleClickSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const value = target.attributes.getNamedItem('data-index')?.value
    setcurrindex(parseInt(value))
  }

  useEffect(() => {
    console.log(currindex)
  })

  return(
    <FloatingWindowComponent
        title="Status Saya"
        size="lg"
        titlePosition="left"
        onClick={setStatusModalActive}
    >
        <div className="relative -top-4">
            <p className="font-bold">{statusDummyData[currindex].time}</p>
        </div>

        {/* Slider */}
        <div className="w-full flex justify-center mb-4 gap-2">
            {
              statusDummyData.map((item,index) => 
                <div className={`w-3 h-3  rounded-full cursor-pointer ${index == currindex ? "bg-cyan-400" : "bg-gray-300"}`} data-index={index} onClick={handleClickSlider}></div>
              )
            }
        </div>

        {/* img */}
        <div className="w-12/12 relative flex flex-row">

            {/* Left Arrow */}
            {
                currindex > 0 &&
                <div className='absolute bg-black bg-opacity-20 w-16 h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all'>
                    <div className="cursor-pointer" data-method='previous' onClick={handleCurrIndex}>             
                        <Icons.LeftTriangleIcon fontsize="40" data-method='previous' />                   
                    </div>
                </div>
            }

            <img src={statusDummyData[currindex].img} className='rounded-[8px]'/>

            {/* Right Arrow*/}
            {
                currindex !== statusdummydata.length - 1 &&
                <div className='absolute bg-black bg-opacity-20 w-16 h-full flex justify-center items-center right-0 opacity-0 hover:opacity-100 transition-all'>
                    <div className="cursor-pointer" data-method="next" onClick={handleCurrIndex}>
                        <Icons.RightTriangleIcon fontsize="40" data-method='previous'/>
                    </div>
                </div>
            }
        </div>

        {/* input */}
        <div>
            <InputComponent />
        </div>
        
    </FloatingWindowComponent>
  )
}

export default StatusFloatingComponent