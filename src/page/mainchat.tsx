import MainChat from "../section/main"
import {Helmet} from "react-helmet"

const MainPageChat = () => {
  return(
    <>
        <Helmet>
            <title>Chat With U</title>
        </Helmet>
        
        <MainChat />
    </>
  )
}

export default MainPageChat