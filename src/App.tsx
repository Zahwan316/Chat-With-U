import LoginPage from "./page/login"
import MainPageChat from "./page/mainchat"
import { BrowserRouter,Route,Routes, useLocation, useNavigate } from "react-router-dom"
import useUserStore from "./state/user"
import { useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname === "/"){
      navigate("/login")
    }
  })

  return (
    <>
      
        <Routes>
          <Route path='/chat' element={<MainPageChat />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      
    </>
  )
}

export default App
