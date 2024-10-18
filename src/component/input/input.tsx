import { memo } from "react"
import { motion } from 'framer-motion';
import Icons from "../icons";
import InputProperty from "../../types/inputProperty";


const InputComponent = memo((props: InputProperty) => {
  return(
    <div style={{width:props.width}} className={`w-[gap-2 justify-center mb-4 flex flex-col relative`}>
        {
          props.label &&
          <label className="font-bold text-md mb-2">{props.label}</label>
        }

        {
          props.type === "textarea" ?
          <textarea whileFocus={{backgroundColor:"#5356FF90"}} type={props.type} onChange={props.onChange} value={props.value} name={props.name} placeholder={props.placeholder} className={`w-full resize-none h-32 bg-[#5356FF40] p-3 ${props.usingIcon && "pr-10"} outline-none rounded-md placeholder-[#f4f4f490] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}>test</textarea>
          :
          <motion.input whileFocus={{backgroundColor:"#5356FF90"}} type={props.type} onChange={props.onChange} value={props.value} name={props.name} placeholder={props.placeholder} className={`w-full bg-[#5356FF40] p-3 ${props.usingIcon && "pr-10"} outline-none rounded-md placeholder-[#f4f4f490] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} />

        }
        
        {
          props.usingIcon &&
            <div className='absolute right-2 cursor-pointer' onClick={props.onClick}>
              <Icons.SearchIcon fontsize="25" />
            </div>
        }

        {
          props.error && 
          <p className='text-sm  font-bold'>*{props.error}</p>
        }
    </div>
  )
})

export default InputComponent