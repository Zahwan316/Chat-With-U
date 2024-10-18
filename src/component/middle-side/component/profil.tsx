import { useEffect } from "react"
import useComponentStore from "../../../state/component"
import useFormStore from "../../../state/form"
import useUserStore from "../../../state/user"
import InputProperty from "../../../types/inputProperty"
import ButtonComponent from "../../button/button"
import Icons from "../../icons"
import InputComponent from "../../input/input"
import { motion } from 'framer-motion';


const ProfileMainComponent = () => {
  const setProfileMenuActive = useComponentStore((state) => state.setProfileMenuActive)
  const form = useFormStore((state) => state.form)
  const setform = useFormStore((state) => state.setform)
  const userinfo = useUserStore((state) => state.userinfo)

  const PropertyInput: Array<InputProperty> = [
    {
        label:'Fullname',
        name:"fullname",
        onChange:() => {},
        placeholder:"",
        type:"text",
        usingIcon:false,
        error:"",
        onClick:() => {},
        width:"100%",
        value:form.fullname
    },
    {
        label:'Username',
        name:"username",
        onChange:() => {},
        placeholder:"",
        type:"text",
        usingIcon:false,
        error:"",
        onClick:() => {},
        width:"100%",
        value:form.username
    },
    {
        label:'Email',
        name:"email",
        onChange:() => {},
        placeholder:"",
        type:"email",
        usingIcon:false,
        error:"",
        onClick:() => {},
        width:"100%",
        value:form.email
    },
    {
        label:'Nomor Telepon',
        name:"number_phone",
        onChange:() => {},
        placeholder:"",
        type:"number",
        usingIcon:false,
        error:"",
        onClick:() => {},
        width:"100%",
        value:form.number_phone
    },
    {
        label:'Bio',
        name:"bio",
        onChange:() => {},
        placeholder:"",
        type:"textarea",
        usingIcon:false,
        error:"",
        onClick:() => {},
        width:"100%",
        value:form.bio
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

  useEffect(() => {
    for(const key in userinfo){
        if(key === "password"){
            continue
        }
        console.log(key)
        setform(key,userinfo[key])
    }

  },[])

  return(
    <motion.div className="relative" initial={{opacity:0,left:"20px",top:"-20px",scale:0}} animate={{opacity:1,left:"0px",top:"0px",scale:1}} exit={{opacity:0,left:"20px",top:"-20px",scale:0}} transition={{duration:0.450}}>
        <div className='w-full h-16 border-b p-4 flex justify-between items-center border-b-white'>
            <div className='cursor-pointer' onClick={() => {setProfileMenuActive()}}>
                <Icons.CloseIcon fontsize="25" />
            </div>
            <div>
                <p className='text-xl font-bold'>Profile Saya</p>
            </div>
            <div>

            </div>
        </div>
        <div className='flex flex-row p-6'>
            <div className='w-1/3 mr-4'>
                <img src='./img/profile.png' className="hover:brightness-75 cursor-pointer transition-all rounded-full"  />
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
                                />
                            ))}
                        </div>
                    )
                }
                <div className='mt-16'>
                    <ButtonComponent body="Simpan perubahan" onClick={() => {}} width=""  />
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default ProfileMainComponent