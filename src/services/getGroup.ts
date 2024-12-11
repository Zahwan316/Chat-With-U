import axios from "axios"
import user from "../types/user"
import MemberGroup from "../types/memberGroup";

type prop = {
    group: Array<MemberGroup>,
    userInfo: user,
    addGroup: (data: MemberGroup[]) => void,
    token: string
}


const getGroup = ({group,userInfo,addGroup,token}: prop) => {
    if(group.length === 0 && userInfo){
        if(userInfo?.id){
          setTimeout(async() => {
            const resGroup = await axios.get(`${import.meta.env.VITE_APP_URL}api/memberGroup/userId/${userInfo.id}`,{
              "headers":{
                "Authorization":`Bearer ${token}`
              }
            })
            const dataGroup = resGroup.data.data
            addGroup(dataGroup)
          }, 2000);
        }
        
      }
}

export default getGroup