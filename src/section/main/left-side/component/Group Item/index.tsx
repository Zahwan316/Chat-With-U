import { memo, MouseEventHandler } from "react";

type props = {
    id: string;
    body: string;
    time: string;
    onClick: MouseEventHandler<HTMLDivElement>,
    name: string,
    img: string,
};

const GroupItemComponent = memo((props: props) => {
  return(
    <div className='w-full h-20 p-2 flex flex-row relative top-5  rounded-xl mb-2 hover:bg-[#5356FF] cursor-pointer transition-all' data-id={props.id}  onClick={props.onClick}>
      <div className='w-18 mx-2' data-id={props.id} >
          <img src={props.img  === "/" ? "https://www.svgrepo.com/show/286776/users-young.svg" : props.img} className='w-full h-full rounded-full' data-id={props.id} />
      </div>
      <div className='w-2/3' data-id={props.id} >
          <h2 data-id={props.id}  className ='font-bold text-xl mb-2'>{props.name}</h2>
          <p data-id={props.id}   className="line-clamp-1">{props.body}</p>
      </div>
      <div className="flex flex-col " data-id={props.id}>
          <span data-id={props.id}  className='z-0 top-1 relative'>{props.time}</span>
          <span data-id={props.id}  className={`rounded-full bg-blue-500 min-w-6 w-auto flex justify-center items-center `}>{}</span>
      </div>
    </div>
  )
})

export default GroupItemComponent