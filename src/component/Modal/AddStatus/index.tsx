import { ChangeEvent, memo, MouseEvent, useState } from "react"
import useComponentStore from "../../../state/component"
import Icons from "../../Icons"
import FloatingWindowComponent from ".."
import ButtonComponent from "../../Button"
import useFormStore from "../../../state/form"
import InputComponent from "../../Input"
import useUserStore from "../../../state/user"
import ErrorNotification from "../../../function/errorSwal"
import Cookies from 'js-cookie';
import ShowNotification from "../../../function/notification"
import { io } from "socket.io-client"
import { v4 as uuidv4 } from 'uuid';

const tipeStatus: string[] = ['Gambar', 'Text']

const socket = io(import.meta.env.VITE_APP_URL)
const AddStatusFloatingWindowComponent = () => {
  const [currStatusMenu, setCurrStatusMenu] = useState<string>("gambar")
  const date = new Date()
  const token = Cookies.get("token")

  //user state
  const userInfo = useUserStore((state) => state.userinfo)

  //form state
  const setform = useFormStore((state) => state.setform)
  const form = useFormStore((state) => state.form)
  const resetform = useFormStore((state) => state.resetform)

  //component state
  const setAddStatusModalActive = useComponentStore((state) => state.setAddStatusModalActive)

  //handle status menu
  const handleStatusMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement
    const value = target.attributes.getNamedItem('data-menu')?.value
    setCurrStatusMenu(value as string)
  }

  //handle form
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setform(name, value)
  }

  //status data structure
  const statusJsonStructure = {
    id: uuidv4(),
    user_id: userInfo.id,
    img_id: null,
    text: form?.text,
    time: `${date.getHours()}:${date.getMinutes().toString().length == 1 ? "0" : ""}${date.getMinutes()}`,
    created_date: date.toISOString(),
    type: currStatusMenu === "gambar" ? "img" : "text",
    token: token
  }

  //send form
  const handleSendStatus = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const send = async () => {
      try {
        socket.emit("status", statusJsonStructure)
        ShowNotification("Berhasil", "Status berhasil ditambahkan")
      }
      catch (e) {
        ErrorNotification(e)
      }
    }

    send()
  }

  return (
    <FloatingWindowComponent
      onClick={setAddStatusModalActive}
      title="Tambah Status"
      size="xl"
      titlePosition="left"
    >
      <div className="w-full">
        <p className="font-bold mb-4">Jenis Status : </p>

        {/* Status Menu */}
        <div className='w-2/5 flex flex-row gap-4 mb-8'>
          {tipeStatus.map((item) =>
            <div className={`w-24 px-16 py-2 border rounded-md flex justify-center items-center cursor-pointer ${currStatusMenu === item.toLowerCase() && 'bg-white text-black'}`} onClick={handleStatusMenu} data-menu={item.toLowerCase()}><p>{item}</p></div>
          )}
        </div>

      </div>
      <div className="w-[30vw] h-[30vh]">
        {
          currStatusMenu === "gambar" &&
          <div className="border h-full w-full p-4 rounded-md justify-center items-center cursor-pointer flex flex-col">
            <div className="mb-4">
              <Icons.UploadIcon fontsize="35" />
            </div>
            <p>Upload Gambar Disini</p>
          </div>
        }
        {
          currStatusMenu === "text" &&
          <div className="">
            <InputComponent
              name="text"
              onChange={handleForm}
              placeholder=""
              type="text"
              usingIcon={false}
              value={form.text}
              error={""}
              key={""}
              label="Ketik disini"

            />
          </div>
        }

      </div>
      <div className="w-full flex justify-center items-center h-24">
        <ButtonComponent body='Upload Status' onClick={handleSendStatus} width='full' />
      </div>
    </FloatingWindowComponent>
  )
}

export default AddStatusFloatingWindowComponent