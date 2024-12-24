import Icons from "../../../../../component/icons"


const StatusComponent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className='mb-6'>
        <Icons.InfoIcon fontsize="65" />
      </div>
      <p className="font-bold text-2xl">Tekan kontak untuk melihat status</p>
    </div>
  )
}

export default StatusComponent
