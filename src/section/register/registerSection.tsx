import { useEffect, useState } from "react"
import useFormStore from "../../state/form"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import ErrorNotification from "../../function/errorSwal"
import ConsoleDebug from "../../function/debugConsole"
import BoxLoginRegister from "../../component/BoxLogin&Register"
import InputComponent from "../main/middle-side/Input"

const RegisterMainComponent = () => {
  const setform = useFormStore((state) => state.setform)
  const form = useFormStore((state) => state.form)
  const [error, seterror] = useState({ fullname: "", username: "", email: "", password: "", repeat_password: "", number_phone: "" })
  const navigate = useNavigate()

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setform(name, value)
  }

  const validateInput = () => {
    const errors = {}

    if (form?.fullname === "") {
      errors.fullname = "Nama lengkap tidak boleh kosong!"
    }

    if (form?.username === "") {
      errors.username = "Username tidak boleh kosong!"
    }

    if (form?.email === "") {
      errors.email = "Email tidak boleh kosong"
    }

    if (form?.password === "") {
      errors.password = "Password tidak boleh kosong"
    }

    if (form?.number_phone === "" || form?.number_phone === null || form?.number_phone === undefined) {
      errors.number_phone = "Nomor telepon tidak boleh kosong"
    }

    if (form?.repeat_password !== form.password) {
      errors.repeat_password = "Konfirmasi password tidak cocok"
    }

    seterror(errors)
    return Object.entries(errors).length
  }

  const handleRegister = async () => {
    try {
      if (validateInput() === 0) {
        const res = await axios.post(`${import.meta.env.VITE_APP_URL}auth/register`, form)
        Swal.fire({
          text: res.data?.message,
          icon: "success",
          title: "Berhasil",
          timer: 1000
        })
        setTimeout(() => {
          navigate("/login")
        }, 1300)
      }
    }
    catch (e) {
      console.log(validateInput())
      ErrorNotification(e)
    }
  }

  useEffect(() => {
    for (const key in error) {
      setform(key, error[key])
    }
  }, [])

  useEffect(() => {
    ConsoleDebug(form)
  })

  return (
    <BoxLoginRegister
      title="Registrasi"
    >
      <div className='flex flex-col'>
        <div className='flex flex-wrap flex-row justify-between'>
          <InputComponent
            name="fullname"
            onChange={handleForm}
            placeholder="Nama Lengkap"
            type="text"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.fullname}
            width={"50%"}
          />
          <InputComponent
            name="username"
            onChange={handleForm}
            placeholder="Username"
            type="text"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.username}

          />
        </div>
        <div>
          <InputComponent
            name="email"
            onChange={handleForm}
            placeholder="Email"
            type="text"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.email}

          />
          <InputComponent
            name="number_phone"
            onChange={handleForm}
            placeholder="Nomor Telepon"
            type="number"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.number_phone}

          />
          <InputComponent
            name="password"
            onChange={handleForm}
            placeholder="Password"
            type="password"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.password}
          />
          <InputComponent
            name="repeat_password"
            onChange={handleForm}
            placeholder="Ulangi Password"
            type="password"
            usingIcon={false}
            error={Object.entries(error).length != 0 && error.repeat_password}
          />
        </div>
        <div className='mb-8'>
          <p className='text-[#e7e6e6] text-sm'>Sudah punya akun? <a className="text-[#05BDF8] cursor-pointer" onClick={() => { navigate("/login") }}>Login Sekarang</a></p>
        </div>
      </div>
      <ButtonComponent
        body="Registrasi"
        onClick={handleRegister}
        width="full"
      />
    </BoxLoginRegister>
  )
}

export default RegisterMainComponent