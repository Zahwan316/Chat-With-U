import LoginPage from "./page/login"
import MainPageChat from "./page/mainchat"
import {Route,Routes, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import RegisterPage from "./page/register"

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
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      
    </>
  )
}

export default App
