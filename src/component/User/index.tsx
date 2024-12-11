import { MouseEventHandler } from "react"

type props = {
    username: string,
    img: string,
    onClick: MouseEventHandler,
    id: string
}

const ListUser = (props: props) => {
  return(
    <div className='w-full h-16 mb-4 rounded-lg bg-[#5356FF80] flex items-center flex-row hover:bg-[#5356FF50] cursor-pointer transition-all' onClick={props.onClick} data-id={props.id}>
        <div className='w-20 h-full p-4 flex items-center' data-id={props.id}>
            <img src={props.img != "/" ? props.img : "./img/profile.png"} className='w-full' data-id={props.id} />
        </div>
        <div data-id={props.id}>
            <p>{props.username}</p>
        </div>
    </div>
  )
}

export default ListUser