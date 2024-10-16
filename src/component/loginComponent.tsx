import { ChangeEvent, useEffect, useState } from "react"
import useFormStore from "../state/form"
import InputComponent from "./input/input"
import ButtonComponent from "./button/button"
import axios from "axios"
import Swal from "sweetalert2"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import BoxLoginRegister from "./box/boxLoginRegister"
import ErrorNotification from "../function/errorSwal"

type errorState = {
  email: string,
  password: string
}

const LoginComponent = () => {
  const form = useFormStore((state) => state.form)
  const setForm = useFormStore((state) => state.setform)
  const navigate = useNavigate()
  const [error,seterror] = useState<errorState>({email:"",password:""})

  const handleForm = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setForm(name,value) 
  }

  const validateInput = () => {
    const errors = {}

    if(form?.email === ""){
      errors.email = "Email tidak boleh kosong"
    }

    if(form?.password === ""){
      errors.password = "Password tidak boleh kosong"
    }

    seterror(errors)

    return Object.entries(errors).length
  }

  const sendData = () => {
    const send = async() => {
      try{
        console.log(validateInput())
        if(validateInput() === 0){
          const res = await axios.post(`${import.meta.env.VITE_APP_URL}auth/login`,form)
          console.log(res)
          Swal.fire({
            title:"Login berhasil",
            icon:"success",
            timer:1000
          })
          Cookies.set("token",res.data.token)
          setTimeout(() => {
            navigate("/chat")
          },1100)
        }
      }
      catch(e){
       ErrorNotification(e)
      }
    }
    send()  
  }

  useEffect(() => {
    console.log(error)
  })

  useEffect(() => {
    setForm("email","")
    setForm("password","")
  },[])

  return(
    <BoxLoginRegister
      title='Login'
    >
        <div className='w-full'>   
          <InputComponent 
              name="email"
              onChange={handleForm}
              placeholder="Email"
              type="text"
              width="56px"
              error={Object.entries(error).length != 0 && error?.email}
              usingIcon={false}
          />
          <InputComponent 
              name="password"
              onChange={handleForm}
              placeholder="Password"
              type="password"
              width="56px"
              error={Object.entries(error).length != 0 && error?.password}
              usingIcon={false}
          />
        </div>
        <div className='mb-10'>
          <p className='text-[#e7e6e6] text-sm'>Belum mempunyai akun? <a className='text-[#05BDF8] cursor-pointer' onClick={() => {navigate("/register")}}>Registrasi Sekarang</a></p>
        </div>
        <div className=''>
          <ButtonComponent 
            body="Login"
            onClick={sendData}
            width="full"
          />
        </div>
    </BoxLoginRegister>
        
    
  )
}

export default LoginComponent