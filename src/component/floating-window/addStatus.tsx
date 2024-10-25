import { useState } from "react"
import useComponentStore from "../../state/component"
import Icons from "../icons"
import FloatingWindowComponent from "./floating"
import RichTextEditor from "../editor/QuillEditor"
import ButtonComponent from "../button/button"
import useFormStore from "../../state/form"

const tipeStatus: string[] = ['Gambar','Text']

const AddStatusFloatingWindowComponent = () => {
  const [currStatusMenu,setCurrStatusMenu] = useState<string>("gambar") 
  
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
    console.log(value)
    setCurrStatusMenu(value as string)
  }

  //handle form
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  //send form
  const handleSendStatus = () => {

  }

  return(
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
                    <RichTextEditor
                        value='lorem'
                        onChange={handleForm}
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