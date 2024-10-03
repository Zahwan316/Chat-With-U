import { ChangeEvent } from "react"
import useFormStore from "../state/form"
import InputComponent from "./input/input"
import ButtonComponent from "./button/button"
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const LoginComponent = () => {
  const form = useFormStore((state) => state.form)
  const setForm = useFormStore((state) => state.setform)
  const navigate = useNavigate()

  const handleForm = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setForm(name,value) 
  }

  const sendData = () => {
    const send = async() => {
      try{
        const res = await axios.post(`${import.meta.env.VITE_APP_URL}auth/login`,form)
        console.log(res)
        Swal.fire({
          text:"Login berhasil",
          icon:"success",
          timer:1000
        })
        Cookies.set("token",res.data.token)
        setTimeout(() => {
          navigate("/chat")
        },1100)
      }
      catch(e){
        console.log(e)
        Swal.fire({
          text:e.response.message,
          icon:"error"
        })
      }
    }
    send()
  }

  return(
    <div className='w-[20%] h-2/5  border border-[#ffffff30] rounded-2xl bg-gradient-to-br from-[#ffffff50] to-[#1d4ed820] bg-opacity-15 backdrop-blur-lg py-4 px-6'>
        <div className='w-full h-16 flex justify-center items-center mb-2'>
            <h2 className='font-bold text-xl'>Login</h2>
        </div>
        <div className='w-full'>   
          <InputComponent 
              name="email"
              onChange={handleForm}
              placeholder="Email"
              type="text"
              width="56px"
          />
          <InputComponent 
              name="password"
              onChange={handleForm}
              placeholder="Password"
              type="password"
              width="56px"
          />
        </div>
        <div className='mb-10'>
          <p className='text-[#e7e6e6] text-sm'>Belum mempunyai akun? <a className='text-[#05BDF8]'>Registrasi Sekarang</a></p>
        </div>
        <div className=''>
          <ButtonComponent 
            body="Login"
            onClick={sendData}
            width="full"
          />
        </div>
    </div>
  )
}

export default LoginComponent