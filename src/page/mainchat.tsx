import { memo } from "react"
import MainChat from "../section/main/view"
import {Helmet} from "react-helmet"

const MainPageChat = memo(() => {
  return(
    <>
        <Helmet>
            <title>Chat With U</title>
        </Helmet>
        
        <MainChat />
    </>
  )
})

export default MainPageChat