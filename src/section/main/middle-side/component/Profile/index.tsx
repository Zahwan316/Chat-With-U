import { ChangeEvent, useEffect, useState } from "react"
import useComponentStore from "../../../../../state/component"
import useFormStore from "../../../../../state/form"
import useUserStore from "../../../../../state/user"
import InputProperty from "../../../../../types/inputProperty"

import { motion } from 'framer-motion';
import ErrorNotification from "../../../../../function/errorSwal"
import axios from "axios"
import Cookies from 'js-cookie';
import ConsoleDebug from "../../../../../function/debugConsole"
import { v4 as uuidv4 } from "uuid"
import ShowNotification from "../../../../../function/notification"
import Icons from "../../../../../component/icons"

import ButtonComponent from "../../../../../component/Button"
import InputComponent from "../../../../../component/Input"
import useInputLogic from "../../../../../hooks/useForm"
import { SubmitHandler, useForm } from "react-hook-form"

type dataForm = {
  fullname: string,
  username: string,
  email: string,
  number_phone: number,
  bio: string,
}

const ProfileMainComponent = () => {
  const setProfileMenuActive = useComponentStore((state) => state.setProfileMenuActive)
  const form = useFormStore((state) => state.form)
  const setform = useFormStore((state) => state.setform)
  const userinfo = useUserStore((state) => state.userinfo)
  const setuserinfo = useUserStore((state) => state.setuserinfo)
  const token = Cookies.get("token")
  const [updater, setupdater] = useState<string>("")
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<dataForm>({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      number_phone: 0,
      bio: "",
    },
  });

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setform(name, value)
  }

  const PropertyInput: Array<InputProperty> = [
    {
      label: 'Fullname',
      name: "fullname",
      //onChange: handleForm,
      placeholder: "",
      type: "text",
      usingIcon: false,
      error: "",
      //onClick:() => {},
      width: "100%",
      //value: form.fullname,
      register: register,
      errors: errors,
    },
    {
      label: 'Username',
      name: "username",
     // onChange: handleForm,
      placeholder: "",
      type: "text",
      usingIcon: false,
      error: "",
      //onClick:() => {},
      width: "100%",
      //value: form.username,
      register: register,
      errors: errors,
    },
    {
      label: 'Email',
      name: "email",
      //onChange: handleForm,
      placeholder: "",
      type: "email",
      usingIcon: false,
      error: "",
      //onClick:() => {},
      width: "100%",
      //value: form.email,
      register: register,
      errors: errors,
    },
    {
      label: 'Nomor Telepon',
      name: "number_phone",
      //onChange: handleForm,
      placeholder: "",
      type: "number",
      usingIcon: false,
      error: "",
      //onClick:() => {},
      width: "100%",
      //value: form.number_phone,
      register: register,
      errors: errors,
    },
    {
      label: 'Bio',
      name: "bio",
      //onChange: handleForm,
      placeholder: "",
      type: "textarea",
      usingIcon: false,
      error: "",
      //onClick:() => {},
      width: "100%",
      //value: form.bio,
      register: register,
      errors: errors,
    },
  ]

  const groupedInputs = PropertyInput.reduce<InputProperty[][]>((result, item, index) => {
    if (index % 2 === 0) {
      result.push([item]);
    } else {
      result[result.length - 1].push(item);
    }
    return result;
  }, []);

  const handleSendData = (dataForm: dataForm) => {
    const sendData = async () => {
      try {
        const res = await axios.put(`${import.meta.env.VITE_APP_URL}api/user/id/${userinfo.id}`, dataForm, {
          "headers": {
            "Authorization": `Bearer ${token}`
          }
        })
        setupdater(uuidv4())
        const message = res.data.message
        ShowNotification("Berhasil", message)
        ConsoleDebug(res)
      }
      catch (e: unknown) {
        ErrorNotification(e)
      }
    }
    sendData()
  }

  const onSubmit: SubmitHandler<dataForm> = (data) => handleSendData(data)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/user/id/${userinfo.id}`, {
          "headers": {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = res.data.data
        
        setValue("fullname", data.fullname || "");
        setValue("username", data.username || "");
        setValue("email", data.email || "");
        setValue("number_phone", data.number_phone || 0);
        setValue("bio", data.bio || "");

        setuserinfo(data)

      }
      catch (e) {
        ErrorNotification(e)
      }
    }

    getData()
  }, [updater, setValue])

  useEffect(() => {
    for (const key in userinfo) {
      if (key === "password") {
        continue
      }
      else if (key === "id") {
        continue
      }

      setform(key, userinfo[key])
    }

  }, [])

  return (
    <motion.div className="relative" initial={{ opacity: 0, left: "20px", top: "-20px", scale: 0 }} animate={{ opacity: 1, left: "0px", top: "0px", scale: 1 }} exit={{ opacity: 0, left: "20px", top: "-20px", scale: 0 }} transition={{ duration: 0.450 }}>
      <div className='w-full h-16 border-b p-4 flex justify-between items-center border-b-white'>
        <div className='cursor-pointer' onClick={() => { setProfileMenuActive() }}>
          <Icons.CloseIcon fontsize="25" />
        </div>
        <div>
          <p className='text-xl font-bold'>Profile Saya</p>
        </div>
        <div>

        </div>
      </div>
      <form onSubmit={ handleSubmit(onSubmit) }>     
        <div className='flex flex-row p-6'>
          <div className='w-1/3 mr-4'>
            <img src='./img/profile.png' className="hover:brightness-75 cursor-pointer transition-all rounded-full" />
          </div>
          <div className="w-1/2 flex-col">
            {
              groupedInputs.map((group) =>
                <div className='flex flex-row gap-6 items-start mb-2'>
                  {group.map((item) => (
                    <InputComponent
                      name={item.name}
                      onChange={item.onChange}
                      placeholder={item.placeholder}
                      type={item.type}
                      usingIcon={item.usingIcon}
                      error={item.error}
                      label={item.label}
                      onClick={item.onClick}
                      width={item.width}
                      value={item.value}
                      register={ item.register }
                      errors={ item.errors }
                    />
                  ))}
                </div>
              )
            }
            <div className='mt-16'>
              <ButtonComponent body="Simpan perubahan" type="submit" width="" />
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default ProfileMainComponent