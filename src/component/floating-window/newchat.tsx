import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import useComponentStore from "../../state/component"
import useFormStore from "../../state/form"
import Icons from "../icons"
import InputComponent from "../input/input"
import ListUser from "../user/listuser"
import FloatingWindowComponent from "./floating"
import axios from "axios"
import useUserStore from "../../state/user"
import { motion } from 'framer-motion';
import useChatStore from "../../state/chat"
import Cookies from 'js-cookie';

const NewChatComponent = () => {
  const setNewChatMenuActive = useComponentStore((state) => state.setNewChatMenuActive)
  const setform = useFormStore((state) => state.setform)
  const form = useFormStore((state) => state.form)
  const searcheduser = useUserStore((state) => state.searchedUser)
  const setsearcheduser = useUserStore((state) => state.setsearcheduser)
  const [searched,setsearched] = useState<boolean>(false)
  const setSessionChat = useChatStore((state) => state.setSessionChat)
  const userinfo = useUserStore((state) => state.userinfo)
  const [description,setdescription] = useState<string>()
  const token = Cookies.get("token")

  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setform(name,value)
  }

  const handleSearchUser = async() => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/user/${form?.no_telepon}`,{
            "headers":{
              "Authorization":`Bearer ${token}`
            }
          })
        const data = res.data.data
        setsearcheduser(data)
        setsearched(true)
        setdescription("User tidak ditemukan")
    }
    catch(e){
        if(import.meta.env.VITE_APP_STAGE === "BUILD"){
            console.log(e)
        }
    }
  }

  const handleClickUser = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const id = target.attributes.getNamedItem("data-id")?.value
    if(id != userinfo.id){
        setSessionChat(id as string)
        setNewChatMenuActive()
    }
    else{
        setdescription("Tidak bisa chat dengan diri sendiri")
    }
  }

  useEffect(() => {
    console.log("search user",searcheduser)
  })

  return(
    <FloatingWindowComponent
        title="Tambah Chat"
        onClick={setNewChatMenuActive}
        size="xl"
    >
        <div>
            <div>
                {
                    searcheduser.length === 0 && searched === true?
                    <div className='p-4'>
                        <motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-bold">{description}</motion.p>
                    </div>
                    :
                    searcheduser.map((item) => 
                        <ListUser
                            id={item.id}
                            img={item.image}
                            username={item.username}
                            onClick={handleClickUser}
                        />
                    )
                    

                }
            </div>
            <div className='w-96 flex flex-row items-center '>
                <InputComponent 
                    placeholder="Cari no telpon"
                    usingIcon={true}
                    type="number"
                    name="no_telepon"
                    onChange={handleInput}
                    onClick={handleSearchUser}
                    width="100%"
                />
            </div>
        </div>
    </FloatingWindowComponent>
  )
}

export default NewChatComponent