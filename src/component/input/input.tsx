import { ChangeEventHandler } from "react"
import { motion } from 'framer-motion';

type inputProps = {
    type: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    name: string,
    placeholder: string,
    width?: string
}

const InputComponent = (props: inputProps) => {
  return(
    <div className='w-full flex justify-center mb-4'>
        <motion.input whileFocus={{backgroundColor:"#5356FF90"}} type={props.type} onChange={props.onChange} name={props.name} placeholder={props.placeholder} className={`w-full bg-[#5356FF40] p-3 outline-none rounded-md placeholder-[#f4f4f490]`} />
    </div>
  )
}

export default InputComponent