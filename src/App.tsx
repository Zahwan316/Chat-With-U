import MainPageChat from "./page/mainchat"
import { BrowserRouter,Route,Routes } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/chat' element={<MainPageChat />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
