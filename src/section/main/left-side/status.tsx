import StatusItemComponent from "./component/statusItem"
import { AnimatePresence, motion } from 'framer-motion';

const StatusMenuComponent = () => {
    
  const title = (title: string) => {
    return(
        <div className='p-2 my-2'>
            <h2 className="font-bold text-xl">{title}</h2>
        </div>
    )
  }

  return(
    <AnimatePresence>
        <motion.div className="relative" initial={{top:"30px",opacity:0}} animate={{top:"0px",opacity:1}} exit={{top:"30px",opacity:0}} transition={{duration:.1,ease:"easeOut"}}>
        {title("Status Saya")}
            <div>
                <StatusItemComponent 
                    id="123"
                    img="./img/profile.png"
                    time="09:30"
                    username="Status Saya"
                />
            </div>
            {title("Update Terbaru")}
            <div>
                <StatusItemComponent 
                    id="123"
                    img="./img/profile.png"
                    time="09:30"
                    username="Lorem"
                />
                <StatusItemComponent 
                    id="123"
                    img="./img/profile.png"
                    time="09:30"
                    username="Lorem"
                />
                <StatusItemComponent 
                    id="123"
                    img="./img/profile.png"
                    time="09:30"
                    username="Lorem"
                />
            </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default StatusMenuComponent