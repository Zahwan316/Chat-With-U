import { FourSquare } from "react-loading-indicators"
import { motion } from 'framer-motion';

const LoadingComponent = () => {
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full h-full absolute flex justify-center flex-col items-center backdrop-blur-md z-99">
        <FourSquare color="#F4F4F4" size="medium" text="" textColor="" />
        <h2 className="font-bold text-2xl">Loading Chat</h2>
    </motion.div>
  )
}

export default LoadingComponent